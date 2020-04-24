'use strict'

module.exports = app => {
	const { STRING, INTEGER, DATE } = app.Sequelize; //获取 sequelize对应的数据类型映射

	const DictionaryDetail = app.model.define('dictionary_detail', {
		detail_id: {
			type: INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		code: {
			type: STRING,
			allowNull: true
		},
		item_key: {
			type: INTEGER,
			allowNull: true
        },
        item_value: {
			type: STRING,
			allowNull: true
		},
		order_number: {
			type: INTEGER,
			allowNull: true
        },
        is_default: {
			type: INTEGER,
			allowNull: true
        },
        dictionary_id: {
			type: INTEGER,
			allowNull: true
		},
		create_time: {
			type: DATE,
			allowNull: true
		},
		creator: {
			type: STRING,
			allowNull: true
		},
		update_time: {
			type: DATE,
			allowNull: true
		},
		updater: {
			type: STRING,
			allowNull: true
		}
	}, {
		tableName: 'dictionary_detail'
	});
	return DictionaryDetail;
};
