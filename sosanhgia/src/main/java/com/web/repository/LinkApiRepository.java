package com.web.repository;

import com.web.entity.CateParents;
import com.web.entity.LinkApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LinkApiRepository extends JpaRepository<LinkApi,Long> {

    @Query("select l from LinkApi l where l.category.id= ?1 order by l.method asc")
    public List<LinkApi> findByCategory(Long id);

    @Query("select l from LinkApi l order by l.method asc ")
    public List<LinkApi> findByAscGet();
}
