package ru.ryu.labs;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.ryu.labs.redis.Increment;
import ru.ryu.labs.redis.IncrementRepository;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class Controller {
    private final IncrementRepository incrementRepository;
    private final boolean USE_REDIS = false;
    private int number = 0;

    @Autowired
    public Controller(IncrementRepository incrementRepository) {
        this.incrementRepository = incrementRepository;
    }

    @GetMapping("increment")
    public ResponseEntity increment() {
        if (USE_REDIS) {
            Optional<Increment> optional = incrementRepository.findById("inc");
            if (optional.isPresent()) {
                Increment increment = optional.get();
                increment.increment();
                incrementRepository.save(increment);

                return new ResponseEntity<>(increment, HttpStatus.OK);
            }

            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(++number, HttpStatus.OK);
        }
    }

    @GetMapping("create")
    public void create() {
        if (USE_REDIS) {
            incrementRepository.save(new Increment("inc"));
        }
    }

    @GetMapping("clear")
    public void clear() { }

    private final static String SERVICE = "https://smarty.mail.ru";
    private final static String DETECT = "/api/v1/objects/detect";
    private final static String RECOGNIZE = "/api/v1/persons/recognize";
    private final static String TOKEN = "2PNC5RYdvT3Njq11v4vu3WhB5GJLET9PwCYHag9Mtpy3sntEBK";
    private final static String FILE_NAME = "11967.jpg";
    private final static String PROVIDER = "mcs";

    @PostMapping("vision")
    public String vision() throws IOException {
        Resource resourceCapture = new ClassPathResource(FILE_NAME);

        if (resourceCapture.exists() || resourceCapture.isReadable()) {
            OkHttpClient client = new OkHttpClient();
            Request request = buildRequest(resourceCapture);
            Response response = client.newCall(request).execute();
            if (!response.isSuccessful()) {
                throw new IOException("Ошибка: " + response);
            }

            return response.body().string();
        }

        return "";
    }

    private Request buildRequest(Resource resourceCapture) throws IOException {
        HttpUrl.Builder urlBuilder = HttpUrl.parse(SERVICE + DETECT).newBuilder();
        urlBuilder.addQueryParameter("oauth_provider", PROVIDER);
        urlBuilder.addQueryParameter("oauth_token", TOKEN);

        String url = urlBuilder.build().toString();

        okhttp3.RequestBody formBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("meta", "{\"mode\":[\"pedestrian\"],\"images\":[{\"name\":\"file_0\"}]}")
                .addFormDataPart("file_0", FILE_NAME, okhttp3.RequestBody.create(MediaType.parse("multipart/form-data"), resourceCapture.getFile()))
                .build();

        return new Request.Builder()
                .url(url)
                .post(formBody)
                .build();
    }
}
