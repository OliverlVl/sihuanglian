/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2020.04.02 15:27:47                          */
/*==============================================================*/


drop table if exists admain;

drop table if exists class;

drop table if exists course;

drop table if exists feedback;

drop table if exists information;

drop table if exists score;

drop table if exists select_course;

drop table if exists sign_in;

drop table if exists student;

drop table if exists teacher;

/*==============================================================*/
/* Table: admain                                                */
/*==============================================================*/
create table admain
(
   admain_id            int not null auto_increment,
   admain_number        int not null,
   admain_name          varchar(20) not null,
   admain_password      varchar(100) not null,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (admain_id)
);

/*==============================================================*/
/* Table: class                                                 */
/*==============================================================*/
create table class
(
   class_id             int not null auto_increment,
   class_name           varchar(20) not null,
   class_life_time      date,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (class_id)
);

/*==============================================================*/
/* Table: course                                                */
/*==============================================================*/
create table course
(
   course_id            int not null auto_increment,
   course_number        int not null,
   course_name          varchar(255) not null,
   course_school        varchar(255) not null,
   course_college       varchar(255) not null,
   course_teacher_id    int not null,
   course_term_time     varchar(255) not null,
   course_week_time     varchar(255) not null,
   course_introduction  varchar(255),
   course_exam_time     datetime,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (course_id)
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
   admain_id            int not null,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (information_id)
);

/*==============================================================*/
/* Table: score                                                 */
/*==============================================================*/
create table score
(
   score_id             int not null auto_increment,
   student_id           int not null,
   course_id            int not null,
   usual_score          decimal(5,2) not null,
   exam_score           decimal(5,2) not null,
   final_score          decimal(5,2) not null,
   create_time          datetime,
   creator              varchar(20),
   update_time          datetime,
   updater              varchar(20),
   primary key (score_id)
);

/*==============================================================*/
/* Table: select_course                                         */
/*==============================================================*/
create table select_course
(
   select_course_id     int not null auto_increment,
   student_id           int not null,
   course_id            int not null,
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
   course_id            int not null,
   teacher_id           int,
   student_place        varchar(255),
   sign_student_time    datetime,
   sign_teacher_time    datetime,
   sign_state           int,
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
   student_sex          varchar(10) not null,
   student_passworld    varchar(100) not null,
   student_telephone    int not null,
   student_mailbox      varchar(20),
   student_born_time    date,
   student_school       varchar(20) not null,
   student_college      varchar(20) not null,
   student_class        int,
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
   teacher_sexs         varchar(10) not null,
   teacher_password     varchar(100) not null,
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

alter table course add constraint FK_Reference_9 foreign key (course_teacher_id)
      references teacher (teacher_id) on delete restrict on update restrict;

alter table information add constraint FK_Reference_10 foreign key (admain_id)
      references admain (admain_id) on delete restrict on update restrict;

alter table score add constraint FK_Reference_2 foreign key (course_id)
      references course (course_id) on delete restrict on update restrict;

alter table score add constraint FK_Reference_8 foreign key (student_id)
      references student (student_id) on delete restrict on update restrict;

alter table select_course add constraint FK_Reference_3 foreign key (student_id)
      references student (student_id) on delete restrict on update restrict;

alter table select_course add constraint FK_Reference_4 foreign key (course_id)
      references course (course_id) on delete restrict on update restrict;

alter table sign_in add constraint FK_Reference_11 foreign key (course_id)
      references course (course_id) on delete restrict on update restrict;

alter table sign_in add constraint FK_Reference_6 foreign key (teacher_id)
      references teacher (teacher_id) on delete restrict on update restrict;

alter table sign_in add constraint FK_Reference_7 foreign key (student_id)
      references student (student_id) on delete restrict on update restrict;

alter table student add constraint FK_Reference_5 foreign key (student_class)
      references class (class_id) on delete restrict on update restrict;

