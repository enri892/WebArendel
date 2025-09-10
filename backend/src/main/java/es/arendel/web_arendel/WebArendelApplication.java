package es.arendel.web_arendel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

//Excluyo la base de datos temporalmente (exclude = {DataSourceAutoConfiguration.class})
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class WebArendelApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebArendelApplication.class, args);
	}

}
