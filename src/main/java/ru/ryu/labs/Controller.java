package ru.ryu.labs;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.ryu.labs.redis.Increment;
import ru.ryu.labs.redis.IncrementRepository;

import javax.annotation.Resource;
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

    private final static String PARSER_URL = "https://smarty.mail.ru/api/v1/objects/detect";
    private final static String TOKEN = "2PNC5RYdvT3Njq11v4vu3WhB5GJLET9PwCYHag9Mtpy3sntEBK";

    @GetMapping("vision")
    public ResponseEntity vision() throws IOException {
        OkHttpClient client = new OkHttpClient();

        Resource resourceCapture = (Resource) new ClassPathResource("vasa.bmp");

        if (resourceCapture.exists() || resourceCapture.isReadable()) {
            HttpUrl.Builder urlBuilder = HttpUrl.parse(PARSER_URL).newBuilder();
            urlBuilder.addQueryParameter("oauth_provider", "mcs");
            urlBuilder.addQueryParameter("oauth_token", TOKEN);
            String url = urlBuilder.build().toString();

            okhttp3.RequestBody formBody = new MultipartBody.Builder()
                    .setType(MultipartBody.FORM)
                    .addFormDataPart("meta", "{\"mode\":[\"object\"],\"images\":[{\"name\":\"file_0\"}]}")
                    .addFormDataPart("file_0", fileS3.getKeyName(), okhttp3.RequestBody.create(MediaType.parse("multipart/form-data"), resourceCapture.getFile()))
                    .build();

            Request request = new Request.Builder()
                    .url(url)
                    .post(formBody)
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) throw new IOException("Не успешно: " + response);
                return response.body().string();
            }
        }
    }
}
