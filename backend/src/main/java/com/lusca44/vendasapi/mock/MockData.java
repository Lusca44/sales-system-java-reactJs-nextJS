package com.lusca44.vendasapi.mock;

import java.math.BigDecimal;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.lusca44.vendasapi.entities.Produto;
import com.lusca44.vendasapi.repositories.ProdutoRepository;

@Configuration
public class MockData implements CommandLineRunner {

	@Autowired
	private ProdutoRepository repo;
	
	@Override
	public void run(String... args) throws Exception {

		Produto prod1 = new Produto("G001", new BigDecimal("110.00"), "Mouse gamer", "Mouse gamer 440DPI");
		Produto prod2 = new Produto("G002", new BigDecimal("300.00"), "Teclado gamer", "Teclado gamer mecanico");
		Produto prod3 = new Produto("G003", new BigDecimal("600.00"), "Headset gamer", "Headset gamer Razer");
		
		repo.saveAll(Arrays.asList(prod1, prod2, prod3));
		
	}

}
