INSERT INTO department(id,name)
VALUES("1,sales"),
      ("2,engineering"),
      ("3,finance"),
      ("4,legal");


INSERT INTO role(title,salary,department_id)
VALUES("Sales leade,100000,1"),
      ("sales Person,80000,1"),
      ("Lead Engineer,150000,2"),
      ("Software Engineer,120000,2"),
      ("Account manager,160000,3"),
      ("Accountant,125000,3"),
      ("Legal Team Lead,250000,4"),
      ("Lawyer,190000,4");


INSERT INTO employee(first_name,last_name,role_id,manger_id) 
VALUES("John,Doe,1,null"),
      ("Mike,Chan,2,1"),
      ("Asley,Rodriguez,3,null"),
      ("Kevin,Tupik,4,3"),
      ("Kunal,Singh,5,null") 
      ("Malia,Brown,6,5"),
      ("Sarah Lourd,7,null"),
      ("Tom, Allen, 7,7");