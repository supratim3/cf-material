name := "mm-webapp-material"

version := "1.0"

// Contains all files and libraries for workorder module
//lazy val workorder = (project in file("modules/workorder")).enablePlugins(PlayJava,SbtWeb)

// Root project. Container for all the projects
//lazy val root = (project in file(".")).enablePlugins(PlayJava,SbtWeb).dependsOn(workorder).aggregate(workorder)
lazy val root = (project in file(".")).enablePlugins(PlayJava,SbtWeb)


scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs
)

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator



