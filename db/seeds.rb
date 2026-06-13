puts "Plantando semillas..."

# En producción las credenciales deben configurarse en el entorno.
admin_email = ENV.fetch("ADMIN_EMAIL") do
  raise "Define ADMIN_EMAIL antes de ejecutar seeds en producción" if Rails.env.production?

  "admin@unel.cl"
end

if Admin.exists?(email: admin_email)
  puts "El administrador #{admin_email} ya existe."
else
  admin_password = ENV.fetch("ADMIN_PASSWORD") do
    raise "Define ADMIN_PASSWORD antes de ejecutar seeds en producción" if Rails.env.production?

    "password123"
  end

  Admin.create!(
    email: admin_email,
    password: admin_password,
    password_confirmation: admin_password
  )
  puts "Cuenta de administrador creada: #{admin_email}"
end

puts "Semillas plantadas con exito."
