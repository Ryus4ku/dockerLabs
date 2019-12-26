CREATE TABLE measurement (
    city_id         int not null,
    logdate         date not null,
    peaktemp        int,
    unitsales       int
) PARTITION BY RANGE (logdate);

CREATE TABLE measurement_y2019 PARTITION OF measurement
FOR VALUES FROM ('2019-01-01') TO ('2006-12-31');

CREATE TABLE measurement_y2020 PARTITION OF measurement
FOR VALUES FROM ('2020-01-01') TO ('2020-12-31');

INSERT INTO measurement VALUES (0, '2019-05-03', 23, 10);
INSERT INTO measurement VALUES (0, '2020-11-03', 23, 10);
INSERT INTO measurement VALUES (0, '2020-01-03', 23, 10);
INSERT INTO measurement VALUES (0, '2020-06-03', 23, 10);
INSERT INTO measurement VALUES (0, '2019-09-03', 23, 10);
INSERT INTO measurement VALUES (0, '2020-04-03', 23, 10);
INSERT INTO measurement VALUES (0, '2019-06-03', 23, 10);
INSERT INTO measurement VALUES (0, '2019-07-03', 23, 10);
INSERT INTO measurement VALUES (0, '2020-02-03', 23, 10);

select * from measurement_y2019
select * from measurement_y2020
select * from measurement