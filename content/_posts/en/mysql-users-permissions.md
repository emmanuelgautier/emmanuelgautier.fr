---
title: MySQL Users & Permissions
description: Database administration includes users and permissions management. Most of the time, a UI like, MySQL Workbench or PHPMyAdmin, is available to perform users management actions. Here, we will see how to do some MySQL users and permissions management with SQL queries.
image: /images/mysql.png
tags:
  - mysql
  - sql
slug: mysql-users-permissions
featured: true
updated: '2015-04-27'
created: '2015-04-27'
---

Database administration includes users and permissions management. Most of the time, a UI like, [MySQL Workbench](https://www.mysql.fr/products/workbench/) or [PHPMyAdmin](https://www.phpmyadmin.net/), is available to perform users management actions. Here, we will see how to do some MySQL users and permissions management with SQL queries.

### User creation

First action, user creation with a password. Two ways to perform this action depending on the way you want to pass the password.

```sql
-- Not hashed password in the query (not very secure)
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';

-- With hashed password
SELECT PASSWORD('password'); -- Création du Hash du mot de passe
CREATE USER 'user'@'localhost' IDENTIFIED BY PASSWORD '*2470C0C06DEE42FD1618BB9900DFG1E6Y89F4';
```

### User renaming

Now, let's see how to rename an already created user with the following query.

```sql
RENAME USER 'user'@'localhost' TO 'user2'@'localhost';
```

### Change the password

Here, it is the same logic as we saw for the user creation. You multiple way to perform this action depending on if you want to use the hashed password way or not.

```sql
SET PASSWORD FOR 'user'@'localhost' = PASSWORD('newpassword');
```

### Permission grant

Let's begin creating a database to perform permission granting on.

```sql
CREATE DATABASE `database` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```

Now, grant user permission on the fresh new database.

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON `database`.* TO 'user'@'localhost';
```

If you want to grant all the permissions for a user, you need to execute the following query :

```sql
GRANT ALL ON `database`.* TO 'user'@'localhost';
```

Now, to take into account those new permissions, you need to execute the query FLUSH.

```sql
FLUSH PRIVILEGES;
```

### Revoke permissions

After grant permissions, let's see how to revoke them. You can revoke all the permissions a user has with the following query.

```sql
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'user'@'localhost';
```

You can revoke only some of the permissions as well.

```sql
REVOKE DELETE ON database.* FROM 'user'@'localhost';
```

### User deletion

The MySQL user deletion depends on the MySQL version you are using. From the 5.0.2 version, you only need the following command to drop the user.


```sql
DROP USER 'user'@'localhost';
```

If the version of MySQL is before 5.0.2, you must first revoke all the permissions the user had to remove it. For more details, have a look at [MySQL official documentation](https://dev.mysql.com/doc/refman/5.0/en/drop-user.html).
