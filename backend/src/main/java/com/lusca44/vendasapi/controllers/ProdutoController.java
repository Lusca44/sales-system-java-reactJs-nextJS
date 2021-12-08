package com.lusca44.vendasapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lusca44.vendasapi.entities.Produto;
import com.lusca44.vendasapi.services.ProdutoService;

@RestController
@RequestMapping(value = "/produtos")
@CrossOrigin("*")
public class ProdutoController {

	@Autowired
	private ProdutoService service;
 
	
	@GetMapping
	public ResponseEntity<List<Produto>> findAll() throws InterruptedException{
		List<Produto> produtos = service.findAll();
		return ResponseEntity.ok().body(produtos);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Produto> findById(@PathVariable Long id) {
		Produto produto = service.findById(id);
		
		if(produto == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok().body(produto);
	}
	
	@PostMapping
	public ResponseEntity<Produto> create(@RequestBody Produto prod){
		Produto produto = service.create(prod);
		return ResponseEntity.ok().body(produto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Void> update(@RequestBody Produto prod, @PathVariable Long id){
		service.update(prod, id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
