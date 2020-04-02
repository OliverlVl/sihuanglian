var loginSqlMap = {

    // 增
    insert: 'insert into login(login_name, login_password, login_type, user_id) values (?, ?, ?, ?)',
    // 删
    deleteById: 'delete from login where login_id = ?',
    // 改 
    updateById: 'update login set login_name = ? , login_password = ? where login_id = ?',
    // 查
    selectByUserId: 'select * from login where user_id = ?'


};

module.exports = loginSqlMap;