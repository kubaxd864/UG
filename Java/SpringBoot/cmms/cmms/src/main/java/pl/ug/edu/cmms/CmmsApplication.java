package pl.ug.edu.cmms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ImportResource("classpath:beans.xml")
public class CmmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmmsApplication.class, args);
	}

}
