package com.lusca44.vendasapi.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table(name = "produto")
public class Produto implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String sku;
	
	@Column(name = "preco", scale = 2, precision = 16)
	private BigDecimal preco;
	
	private String nome;
	private String descricao;
	
	@Column(name= "data_cadastro")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate dataCadastro;
	
	public Produto() {
	}

	public Produto(String sku, BigDecimal preco, String nome, String descricao) {
		this.sku = sku;
		this.preco = preco;
		this.nome = nome;
		this.descricao = descricao;
	}

	public Produto(Long id, String sku, BigDecimal preco, String nome, String descricao) {
		this.id = id;
		this.sku = sku;
		this.preco = preco;
		this.nome = nome;
		this.descricao = descricao;
	}
	
	@PrePersist
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	@Override
	public String toString() {
		return "Produto [id=" + id + ", sku=" + sku + ", preco=" + preco + ", nome=" + nome + ", descricao=" + descricao
				+ "]";
	}
	
	
}
