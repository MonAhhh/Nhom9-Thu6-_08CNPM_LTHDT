package com.web.repository;

import com.web.entity.LinkWeb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LinkWebRepository extends JpaRepository<LinkWeb,Long> {

    @Query("select l from LinkWeb l where l.category.id = ?1")
    public List<LinkWeb> findByCategory(Long id);
}
