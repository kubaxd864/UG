package pl.ug.edu.cmms;

import java.time.Duration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cmms.sla")
public record SlaProperties(
        Duration critical,
        Duration high,
        Duration normal,
        Duration low) {
}
