create table departments (
	dept_no varchar(30),
	dept_name varchar(30),
	primary key(dept_no)
);

create table titles(
	title_id varchar(30),
	title varchar(30),
	primary key(title_id)
);

create table employees(
	emp_no int,
	emp_title_id varchar(30),
	birth_date date, 
	first_name varchar(30),
	last_name varchar(30),
	sex varchar(1),
	hire_date date,
	primary key(emp_no),
	foreign key(emp_title_id) references titles(title_id)
);

drop table dept_emp
create table dept_emp(
	emp_no int,
	dept_no varchar(30),	
	foreign key(emp_no) references employees(emp_no),
	foreign key(dept_no) references departments(dept_no)
);

create table dept_manager(
	dept_no varchar(30),
	emp_no int,
	foreign key(dept_no) references departments(dept_no),
	foreign key(emp_no) references employees(emp_no)
);

create table salaries(
	emp_no int,
	salaries int,
	foreign key(emp_no) references employees(emp_no)
);














