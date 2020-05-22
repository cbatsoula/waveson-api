ActiveAdmin.register User do
  permit_params :username, :password, :location, :name

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :name, :username, :password_digest, :location, :photo
  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :username, :password_digest, :location, :photo]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

end
