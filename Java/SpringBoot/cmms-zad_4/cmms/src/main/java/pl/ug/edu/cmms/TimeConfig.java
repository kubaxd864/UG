package pl.ug.edu.cmms;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class TimeConfig {

    @Bean
    @Profile("!demo")
    Clock realClock() {
        return Clock.systemDefaultZone();
    }

    @Bean
    @Profile("demo")
    Clock frozenClock(@Value("${demo.now}") Instant now) {
        return Clock.fixed(now, ZoneOffset.UTC);
    }
}