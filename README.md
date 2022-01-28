# employee-CRUD-api

To create table

```bash
CREATE TABLE `empdata` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `employee_name` varchar(255) NOT NULL COMMENT 'employee name',
  `employee_salary` double NOT NULL COMMENT 'employee salary',
  `employee_age` int NOT NULL COMMENT 'employee age',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='datatable demo table'
```
