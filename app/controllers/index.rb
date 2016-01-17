
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
  response
end

get '/clinics/:id/data' do
  p params[:id]
  clinic = Clinic.find(params[:id])
  p clinic
  clinic_hash = {name:"#{clinic.name}", full_address:"#{clinic.full_address}"}
  p clinic_hash
  return clinic.to_json
end

get '/clinicsLocations' do
  # @clinics = Clinic.all
  @clinics = Clinic.all
  @clinics.to_json
end

put '/saveLatLng/:id/:lat/:lng' do
  p "PARAMS"
  p "PARAMS"
  p "PARAMS"
  p params
  clinic = Clinic.find(params[:id])
  p
  clinic.lat = params[:lat].to_f.round(8)
  clinic.lng = params[:lng].to_f.round(8)
  if clinic.save
    return "SAVED"
  else
    return "FAILED"
  end
end







# get '/login' do

# end

# get '/signup' do

# end
