puts "🌱 Plantando semillas..."

# Buscamos si ya existe el admin para no crearlo dos veces si corres el comando de nuevo
admin_email = 'admin@unel.cl'
admin_password = 'password123'

if Admin.exists?(email: admin_email)
  puts "✅ El administrador ya existe."
else
  Admin.create!(
    email: admin_email,
    password: admin_password,
    password_confirmation: admin_password
  )
  puts "👑 Cuenta de Admin creada: #{admin_email} / #{admin_password}"
end

puts "🌳 ¡Semillas plantadas con éxito!"
