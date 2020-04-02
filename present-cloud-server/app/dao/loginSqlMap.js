var loginSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into login(login_name, login_password, login_type, user_id) values (?, ?, ?, ?)',
    
    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from login where login_id = ?',
    
    //////////////////////////// 改update ////////////////////////////

    // 根据id修改登入信息
    updateById: 'update login set login_name = ? , login_password = ? where login_id = ?',

    //////////////////////////// 查select ////////////////////////////

    // 根据用户id搜索登入信息
    selectByUserId: 'select * from login where user_id = ?'


};

module.exports = loginSqlMap;