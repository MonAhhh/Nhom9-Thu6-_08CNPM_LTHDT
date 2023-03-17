package com.web.repository;

import com.web.entity.CateParents;
import com.web.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CateParentRepository extends JpaRepository<CateParents,Long> {
}
