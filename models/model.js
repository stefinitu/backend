module.exports=(sequelize,Sequelize) => {
    const Archive=sequelize.define(
        "Archive",
        {
            id:{
                type:Sequelize.STRING,
                primaryKey:true,
                onDelete:'CASCADE',
            },
            room_no:{
                type:Sequelize.STRING,
                allowNull:false,
            },
            name:{
                type:Sequelize.STRING,
                allowNull:false,
            },
            domain:{
                type:Sequelize.STRING,
                allowNull:false,
            },
            object_id:{
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
