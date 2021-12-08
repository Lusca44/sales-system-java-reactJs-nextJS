package com.lusca44.vendasapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lusca44.vendasapi.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
