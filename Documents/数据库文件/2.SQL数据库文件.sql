/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2020.04.24 16:49:43                          */
/*==============================================================*/


drop table if exists admin;

drop table if exists course;

drop table if exists dictionary;

drop table if exists dictionary_detail;

drop table if exists feedback;

drop table if exists information;

drop table if exists login;

drop table if exists select_course;

drop table if exists sign_in;

drop table if exists student;

drop table if exists teacher;

drop table if exists teacher_sign_in;

/*==============================================================*/
/* Table: admin                                                 */
/*==============================================================*/
create table admin
(
   admin_id             int not null auto_increment,
   admin_number         int not null,
   admin_name           varchar(20) not null,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (admin_id)
);

/*==============================================================*/
/* Table: course                                                */
/*==============================================================*/
create table course
(
   course_id            int not null auto_increment,
   course_name          varchar(255) not null,
   course_number        int,
   course_class         varchar(20) not null,
   course_teacher_id    int not null,
   course_image         varchar(255),
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (course_id)
);

/*==============================================================*/
/* Table: dictionary                                            */
/*==============================================================*/
create table dictionary
(
   dictionary_id        int not null,
   name                 varchar(20),
   code                 varchar(20),
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (dictionary_id)
);

/*==============================================================*/
/* Table: dictionary_detail                                     */
/*==============================================================*/
create table dictionary_detail
(
   detail_id            int not null,
   code                 varchar(20),
   item_key             int,
   item_value           varchar(20),
   "order"              int,
   is_default           int comment '1代表是，0代表不是',
   dictionary_id        int,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (detail_id)
);

/*==============================================================*/
/* Table: feedback                                              */
/*==============================================================*/
create table feedback
(
   feedback_id          int not null auto_increment,
   user_id              int not null,
   role                 int not null comment '用数字表示：1代表学生，2代表老师，3代表管理员',
   content              text not null,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (feedback_id)
);

/*==============================================================*/
/* Table: information                                           */
/*==============================================================*/
create table information
(
   information_id       int not null,
   information_name     varchar(20) not null,
   information_context  text not null,
   admin_id             int not null,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (information_id)
);

/*==============================================================*/
/* Table: login                                                 */
/*==============================================================*/
create table login
(
   login_id             int not null,
   login_name           varchar(20),
   login_password       varchar(20),
   login_type           int,
   user_id              int,
   primary key (login_id)
);

/*==============================================================*/
/* Table: select_course                                         */
/*==============================================================*/
create table select_course
(
   select_course_id     int not null auto_increment,
   student_id           int not null,
   course_id            int not null,
   course_experience_point int,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (select_course_id)
);

/*==============================================================*/
/* Table: sign_in                                               */
/*==============================================================*/
create table sign_in
(
   sign_id              int not null auto_increment,
   student_id           int,
   teacher_sign_id      int,
   student_place        varchar(255),
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (sign_id)
);

/*==============================================================*/
/* Table: student                                               */
/*==============================================================*/
create table student
(
   student_id           int not null auto_increment,
   student_number       int not null,
   student_name         varchar(20) not null,
   student_sex          int not null,
   student_telephone    int not null,
   student_mailbox      varchar(20),
   student_born_time    date,
   student_school       varchar(20) not null,
   student_college      varchar(20) not null,
   total_experience_point int,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (student_id),
   unique key UNQ_User_telephone (student_telephone)
);

/*==============================================================*/
/* Table: teacher                                               */
/*==============================================================*/
create table teacher
(
   teacher_id           int not null auto_increment,
   teacher_number       int not null,
   teacher_name         varchar(20) not null,
   teacher_sex          int not null,
   teacher_telephone    int not null,
   student_mailbox      varchar(20),
   teacher_born_time    date,
   teacher_school       varchar(20) not null,
   teacher_college      varchar(20) not null,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (teacher_id),
   unique key UNQ_User_telephone (teacher_telephone)
);

/*==============================================================*/
/* Table: teacher_sign_in                                       */
/*==============================================================*/
create table teacher_sign_in
(
   teacher_sign_id      int not null,
   course_id            int,
   teacher_place        varchar(255),
   teacher_id           int,
   gesture              varchar(20),
   state                int comment '1代表正在签到，0代表结束签到',
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (teacher_sign_id)
);

alter table course add constraint FK_Reference_9 foreign key (course_teacher_id)
      references teacher (teacher_id) on delete restrict on update restrict;

alter table dictionary_detail add constraint FK_Reference_11 foreign key (dictionary_id)
      references dictionary (dictionary_id) on delete restrict on update restrict;

alter table information add constraint FK_Reference_10 foreign key (admin_id)
      references admin (admin_id) on delete restrict on update restrict;

alter table select_course add constraint FK_Reference_3 foreign key (student_id)
      references student (student_id) on delete restrict on update restrict;

alter table select_course add constraint FK_Reference_4 foreign key (course_id)
      references course (course_id) on delete restrict on update restrict;

alter table sign_in add constraint FK_Reference_13 foreign key (teacher_sign_id)
      references teacher_sign_in (teacher_sign_id) on delete restrict on update restrict;

alter table sign_in add constraint FK_Reference_7 foreign key (student_id)
      references student (student_id) on delete restrict on update restrict;

alter table teacher_sign_in add constraint FK_Reference_12 foreign key (course_id)
      references course (course_id) on delete restrict on update restrict;

alter table teacher_sign_in add constraint FK_Reference_8 foreign key (teacher_id)
      references teacher (teacher_id) on delete restrict on update restrict;

