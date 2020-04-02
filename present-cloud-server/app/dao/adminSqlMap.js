var adminSqlMap = {

    // 增 增加一个管理员
    insert:'insert into admin(admin_id, admin_number, admin_name, create_time, creator, update_time, updater) values (0, ?, ?, ?, ?, ?, ?)',
    // 删 通过id删除一个管理员
    deleteById:'delete from admin where admin_id=?',
    // 改 修改管理员姓名
    updateById:'update admin set admin_name=? where admin_id=? ',
    // 查 通过id,查看所有管理员
    select:'select * from admin'


};

module.exports = adminSqlMap;