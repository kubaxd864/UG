package pl.ug.edu.cmms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class CmmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmmsApplication.class, args);
	}

}
