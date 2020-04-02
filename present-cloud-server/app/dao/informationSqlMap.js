var informationSqlMap = {

    //////////////////////////// 增insert ////////////////////////////

    // 增加一条记录
    insert: 'insert into information(information_name, information_context, admin_id, create_time, creator) values (?, ?, ?, ?, ?)',

    //////////////////////////// 删delete ////////////////////////////

    // 根据id删除一个记录
    deleteById: 'delete from information where information_id = ?',

    //////////////////////////// 改update ////////////////////////////

    // 根据id修改发布信息
    updateById: 'update information set information_name = ?, information_context = ?, admin_id = ?, update_time = ?, updater = ? where information_id = ?',

    //////////////////////////// 查select ////////////////////////////

    // 搜索所有管理员发布信息
    selectAll: 'select * from information'


};

module.exports = informationSqlMap;