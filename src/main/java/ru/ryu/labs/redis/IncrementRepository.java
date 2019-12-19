package ru.ryu.labs.redis;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncrementRepository extends CrudRepository<Increment, String> {
}
