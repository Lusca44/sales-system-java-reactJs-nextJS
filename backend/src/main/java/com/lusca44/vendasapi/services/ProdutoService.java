package com.lusca44.vendasapi.services;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lusca44.vendasapi.entities.Produto;
import com.lusca44.vendasapi.repositories.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository repo;
	
	
	public Produto findById(Long id) {
		Optional<Produto> produto = repo.findById(id);
		if(produto.isEmpty()) {
			throw new IllegalArgumentException("Produto não existente");
		}
		return produto.get();
	}
	
	public List<Produto> findAll(){
		return repo.findAll();
	}
	
	public Produto create(Produto produto) {
		return repo.save(produto);
	}
	
	public void update(Produto prod, Long id) {
		try {
		Produto produto = findById(id);
		updateData(produto, prod);
		repo.save(produto);
		}catch(NoSuchElementException e) {
			e.getMessage();
		}
		
	}
	
	public void delete(Long id) {
		Produto produto = findById(id);
		repo.delete(produto);
	}

	private void updateData(Produto produto, Produto prod) {
		produto.setNome(prod.getNome());
		produto.setPreco(prod.getPreco());
		produto.setSku(prod.getSku());
		produto.setDescricao(prod.getDescricao());
	}
}
