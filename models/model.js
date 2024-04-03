module.exports=(sequelize,Sequelize) => {
    const Archive=sequelize.define(
        "Archive",
        {
            uid:{
                type:Sequelize.STRING,
                onDelete:'CASCADE',
            },
            channelName:{
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
                    fields:['loggerDataKey']
                }
            ]
        }
    )

sequelize.sync({force:true});
return [Archive];}
