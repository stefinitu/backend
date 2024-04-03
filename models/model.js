module.exports=(sequelize,Sequelize) => {
    const Archive=sequelize.define(
        "Archive",
        {
            uid:{
                type:Sequelize.STRING,
                primaryKey:true,
                onDelete:'CASCADE',
            },
            channelName:{
                type:Sequelize.STRING,
                allowNull:false,
            },
            name:{
                type:Sequelize.STRING,
                allowNull:false,
            },
            loggerDataKey:{
                type:Sequelize.STRING,
                allowNull:false,
            },
            videoKey:{
                type:Sequelize.STRING,
                allowNull:false,
            }
        },
        {
            tableName:"Archive",
            indexes:[
                {
                    unique:true,
                    fields:['object_id']
                }
            ]
        }
    )

sequelize.sync({alter:true});
return [Archive];}
