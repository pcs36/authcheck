var UsersSchema = function(user){
    this.id = user.id;
    this.f_name = user.f_name;
    this.l_name = user.l_name;
    this.e_mail = user.e_mail;
    this.password = user.password;
    this.is_deleted = 0
    this.created_at = new Date();
    this.updated_at = new Date();
}

export default { UsersSchema }