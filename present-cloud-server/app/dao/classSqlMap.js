var classSqlMap = {

      // 增 增加班级
      insert:'insert into class(class_name, class_life_time, create_time, creator, update_time, updater) values (?, ?, ?, ?, ?, ?)',
      // 删 通过id删除班级
      deleteById:'delete from class where class_id=?',
      // 改 修改班级信息
      updateById:'update class set class_name=?, class_life_time=?, update_time=now(), updater=? where class_id=? ',
      // 查 通过id,查看所有班级
      selectAll:'select * from class'


};

module.exports = classSqlMap;