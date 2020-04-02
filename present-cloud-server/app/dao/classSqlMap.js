var classSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into class(class_name, class_life_time, create_time, creator, update_time, updater) values (?, ?, ?, ?, ?, ?)',

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from class where class_id=?',

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改班级信息
    updateById: 'update class set class_name=?, class_life_time=?, update_time=now(), updater=? where class_id=? ',
    
    //////////////////////////// 查select ////////////////////////////

    // 查看所有班级信息
    selectAll: 'select * from class',


};

module.exports = classSqlMap;