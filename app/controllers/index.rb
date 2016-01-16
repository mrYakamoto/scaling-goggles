
# GOOGLE API KEY
# AIzaSyDBsnO1kJI8VpBFeRTSQjVXykPPpWGtJAY

require 'rest-client'

get '/' do
  # p life_call_parser_cpcs
  @cpcs = Clinic.all
  erb :index
end

get '/geolocate/:name/:full_address' do
  name = params[:name]
  full_address = params[:full_address].split(' ')
  full_address = full_address.join('+')
  response = RestClient.get "https://maps.googleapis.com/maps/api/geocode/json?address=#{full_address}&key=AIzaSyDBsnO1kJI8VpBFeRTSQjVXykPPpWGtJAY"
  p response
end

get '/clinics/:id/data' do
  p params[:id]
  clinic = Clinic.find(params[:id])
  p clinic
  clinic_hash = {name:"#{clinic.name}", full_address:"#{clinic.full_address}"}
  p clinic_hash
  return clinic_hash.to_json
end

get '/numbercpcs' do
  return Clinic.where(clinic_type: "cpc").length.to_s
end







# get '/login' do

# end

# get '/signup' do

# end
