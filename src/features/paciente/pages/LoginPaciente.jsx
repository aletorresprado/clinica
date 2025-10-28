const handleLogin = (e) => {
  e.preventDefault();
  const user = pacientes.find(
    (p) => p.email === email && p.password === password
  );

  if (user) {
    setUserLogged({ ...user, role: "paciente" });
    navigate("/DashboardPaciente");
  } else {
    alert("Email o contraseña incorrectos");
  }
};
