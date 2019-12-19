package ru.ryu.labs.redis;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.w3c.dom.Node;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("Increment")
public class Increment implements Serializable {
    private String id;
    private int increment;

    public Increment(String id) {
        this.id = id;
        this.increment = 0;
    }

    public void increment() {
        this.increment = this.increment + 1;
    }
}
