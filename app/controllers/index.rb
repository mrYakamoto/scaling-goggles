get '/' do
  # p life_call_parser_cpcs
  @cpcs = Clinic.where(clinic_type: "cpc", state: "GA")
  erb :index
end






# get '/login' do

# end

# get '/signup' do

# end
