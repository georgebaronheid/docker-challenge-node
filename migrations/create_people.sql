-- create table people if not exists
-- (
--     id   serial primary key,
--     name varchar(255) not null
-- );
--
-- insert into people (name) if people not exists
-- values ('Alice'),
--        ('Bob'),
--        ('Charlie');

-- this is for MySql
create table if not exists people
(
    id   int auto_increment primary key,
    name varchar(255) not null
    );

insert into people (name)
select 'Alice' from dual where not exists (select 1 from people where name = 'Alice')
union all
select 'Bob' from dual where not exists (select 1 from people where name = 'Bob')
union all
select 'Charlie' from dual where not exists (select 1 from people where name = 'Charlie');