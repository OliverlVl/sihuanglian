var informationSqlMap = {

    // 增
    insert: 'insert into information(information_name, information_context, admin_id, create_time, creator) values (?, ?, ?, ?, ?)',
    // 删
    deleteById: 'delete from information where information_id = ?',
    // 改 
    updateById: 'update information set information_name = ?, information_context = ?, admin_id = ?, update_time = ?, updater = ? where information_id = ?',
    // 查
    selectAll: 'select * from information'


};

module.exports = informationSqlMap;