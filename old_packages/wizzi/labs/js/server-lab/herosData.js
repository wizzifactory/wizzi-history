var Organa = {
  name: "Leia Organa",
  id: "1003",
  appearsIn: [
      "NEWHOPE",
      "EMPIRE",
      "JEDI"
  ]
}

var Skywalker = {
  name: "Luke Skywalker",
  id: "1000",
  appearsIn: [
      "NEWHOPE",
      "EMPIRE",
      "JEDI"
  ]
}

var Solo = {
  name: "Han Solo",
  id: "1000",
  appearsIn: [
      "NEWHOPE",
      "EMPIRE",
      "JEDI"
  ]
}

var hero_R2D2 = {
  name: "R2-D2",
  id: "2001",
  friends: [
      Organa,
      Skywalker,
      Solo
  ],
  appearsIn: [
    "NEWHOPE",
    "EMPIRE",
    "JEDI"
  ]
}

module.exports = [
  hero_R2D2
]