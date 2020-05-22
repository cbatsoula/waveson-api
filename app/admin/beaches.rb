ActiveAdmin.register Beach do
  permit_params :name, :lat, :lng, :vicinity

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :lng, :name, :lat, :vicinity
  #
  # or
  #
  # permit_params do
  #   permitted = [:lng, :name, :lat, :vicinity]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

end
