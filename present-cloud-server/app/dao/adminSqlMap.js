var adminSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert:'insert into admin(admin_number, admin_name, create_time, creator, update_time, updater) values (?, ?, ?, ?, ?, ?)',

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById:'delete from admin where admin_id=?',

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改管理员姓名
    updateById:'update admin set admin_name=? where admin_id=? ',

    //////////////////////////// 查select ////////////////////////////

    // 查看所有管理员信息
    selectAll:'select * from admin'


};

module.exports = adminSqlMap;