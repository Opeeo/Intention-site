import design0 from "./assets/0-intention-site.js";
import { startIntention } from "./intention-runtime.js";

const program = {
  "version": "0.6",
  "filename": "/Users/clementalbos/Dev/Intention/src/app.intent",
  "application": "Intention — Le frontend qui se lit",
  "start": "Home",
  "libraries": [
    "webawesome"
  ],
  "designs": [
    "./design/intention-site.js"
  ],
  "designMap": {},
  "routes": [
    {
      "name": "Home",
      "path": "/",
      "component": "Home",
      "line": 8
    },
    {
      "name": "Documentation",
      "path": "/docs",
      "component": "Documentation",
      "line": 9
    },
    {
      "name": "Reference",
      "path": "/reference",
      "component": "Reference",
      "line": 10
    },
    {
      "name": "Product",
      "path": "/examples/:id",
      "component": "Product",
      "line": 11
    },
    {
      "name": "NotFound",
      "path": "*",
      "component": "NotFound",
      "line": 12
    }
  ],
  "shared": [
    {
      "name": "demoCart",
      "initial": {
        "type": "literal",
        "value": []
      },
      "line": 5
    }
  ],
  "components": [
    {
      "name": "Logo",
      "body": [
        {
          "type": "show",
          "kind": "brand",
          "content": {
            "type": "literal",
            "value": "Intention"
          },
          "children": [],
          "line": 15
        },
        {
          "type": "show",
          "kind": "badge",
          "content": {
            "type": "literal",
            "value": "v0.6"
          },
          "children": [
            {
              "type": "give",
              "name": "variant",
              "value": {
                "type": "literal",
                "value": "brand"
              },
              "line": 16
            },
            {
              "type": "give",
              "name": "pill",
              "value": {
                "type": "literal",
                "value": true
              },
              "line": 16
            }
          ],
          "line": 16
        }
      ],
      "line": 14
    },
    {
      "name": "Navigation",
      "body": [
        {
          "type": "show",
          "kind": "navbar",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "Logo",
              "content": null,
              "children": [],
              "line": 20
            },
            {
              "type": "show",
              "kind": "navLinks",
              "content": null,
              "children": [
                {
                  "type": "show",
                  "kind": "button",
                  "content": {
                    "type": "literal",
                    "value": "Pourquoi"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "plain"
                      },
                      "line": 22
                    },
                    {
                      "type": "give",
                      "name": "href",
                      "value": {
                        "type": "literal",
                        "value": "/#features"
                      },
                      "line": 22
                    }
                  ],
                  "line": 22
                },
                {
                  "type": "show",
                  "kind": "button",
                  "content": {
                    "type": "literal",
                    "value": "Démarrer"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "plain"
                      },
                      "line": 23
                    },
                    {
                      "type": "give",
                      "name": "href",
                      "value": {
                        "type": "literal",
                        "value": "/docs"
                      },
                      "line": 23
                    }
                  ],
                  "line": 23
                },
                {
                  "type": "show",
                  "kind": "button",
                  "content": {
                    "type": "literal",
                    "value": "Documentation"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "plain"
                      },
                      "line": 24
                    },
                    {
                      "type": "give",
                      "name": "href",
                      "value": {
                        "type": "literal",
                        "value": "/reference"
                      },
                      "line": 24
                    }
                  ],
                  "line": 24
                },
                {
                  "type": "show",
                  "kind": "button",
                  "content": {
                    "type": "literal",
                    "value": "Essayer"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "variant",
                      "value": {
                        "type": "literal",
                        "value": "brand"
                      },
                      "line": 25
                    },
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "filled"
                      },
                      "line": 25
                    },
                    {
                      "type": "give",
                      "name": "href",
                      "value": {
                        "type": "literal",
                        "value": "/#start"
                      },
                      "line": 25
                    },
                    {
                      "type": "give",
                      "name": "pill",
                      "value": {
                        "type": "literal",
                        "value": true
                      },
                      "line": 25
                    }
                  ],
                  "line": 25
                }
              ],
              "line": 21
            }
          ],
          "line": 19
        }
      ],
      "line": 18
    },
    {
      "name": "CounterDemo",
      "body": [
        {
          "type": "state",
          "name": "count",
          "initial": {
            "type": "literal",
            "value": 3
          },
          "line": 28
        },
        {
          "type": "derived",
          "name": "doubled",
          "expression": "count * 2",
          "line": 29
        },
        {
          "type": "show",
          "kind": "demoCard",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "tag",
              "content": {
                "type": "literal",
                "value": "Démo vivante"
              },
              "children": [
                {
                  "type": "give",
                  "name": "variant",
                  "value": {
                    "type": "literal",
                    "value": "success"
                  },
                  "line": 32
                },
                {
                  "type": "give",
                  "name": "appearance",
                  "value": {
                    "type": "literal",
                    "value": "filled-outlined"
                  },
                  "line": 32
                },
                {
                  "type": "give",
                  "name": "pill",
                  "value": {
                    "type": "literal",
                    "value": true
                  },
                  "line": 32
                }
              ],
              "line": 32
            },
            {
              "type": "show",
              "kind": "heading",
              "content": {
                "type": "literal",
                "value": "Aucun hook. Aucun boilerplate."
              },
              "children": [],
              "line": 33
            },
            {
              "type": "show",
              "kind": "message",
              "content": {
                "type": "literal",
                "value": "L'état et l'interface restent naturellement synchronisés."
              },
              "children": [],
              "line": 34
            },
            {
              "type": "show",
              "kind": "message",
              "content": {
                "type": "literal",
                "value": "Valeur calculée : {doubled}"
              },
              "children": [],
              "line": 35
            },
            {
              "type": "show",
              "kind": "row",
              "content": null,
              "children": [
                {
                  "type": "show",
                  "kind": "button",
                  "content": {
                    "type": "literal",
                    "value": "−"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "outlined"
                      },
                      "line": 38
                    },
                    {
                      "type": "give",
                      "name": "pill",
                      "value": {
                        "type": "literal",
                        "value": true
                      },
                      "line": 38
                    },
                    {
                      "type": "property",
                      "name": "disabled",
                      "test": "count == 0",
                      "line": 39
                    },
                    {
                      "type": "when",
                      "test": "clicked",
                      "event": true,
                      "children": [
                        {
                          "type": "action",
                          "action": "set",
                          "target": "count",
                          "value": {
                            "type": "expression",
                            "value": "count - 1"
                          },
                          "line": 41
                        }
                      ],
                      "line": 40
                    }
                  ],
                  "line": 38
                },
                {
                  "type": "show",
                  "kind": "number",
                  "content": {
                    "type": "expression",
                    "value": "count"
                  },
                  "children": [],
                  "line": 43
                },
                {
                  "type": "show",
                  "kind": "button",
                  "content": {
                    "type": "literal",
                    "value": "+"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "variant",
                      "value": {
                        "type": "literal",
                        "value": "brand"
                      },
                      "line": 45
                    },
                    {
                      "type": "give",
                      "name": "pill",
                      "value": {
                        "type": "literal",
                        "value": true
                      },
                      "line": 45
                    },
                    {
                      "type": "when",
                      "test": "clicked",
                      "event": true,
                      "children": [
                        {
                          "type": "action",
                          "action": "set",
                          "target": "count",
                          "value": {
                            "type": "expression",
                            "value": "count + 1"
                          },
                          "line": 47
                        }
                      ],
                      "line": 46
                    }
                  ],
                  "line": 45
                }
              ],
              "line": 37
            },
            {
              "type": "when",
              "test": "count > 3",
              "children": [
                {
                  "type": "show",
                  "kind": "message",
                  "content": {
                    "type": "literal",
                    "value": "Le compteur prend de la vitesse."
                  },
                  "children": [],
                  "line": 50
                }
              ],
              "line": 49
            },
            {
              "type": "otherwise",
              "children": [
                {
                  "type": "show",
                  "kind": "message",
                  "content": {
                    "type": "literal",
                    "value": "Encore un petit clic."
                  },
                  "children": [],
                  "line": 52
                }
              ],
              "line": 51
            }
          ],
          "line": 31
        }
      ],
      "line": 27
    },
    {
      "name": "ChoiceEmitter",
      "body": [
        {
          "type": "input",
          "name": "label",
          "initial": {
            "type": "literal",
            "value": "Simple"
          },
          "line": 55
        },
        {
          "type": "show",
          "kind": "button",
          "content": {
            "type": "expression",
            "value": "label"
          },
          "children": [
            {
              "type": "give",
              "name": "appearance",
              "value": {
                "type": "literal",
                "value": "outlined"
              },
              "line": 57
            },
            {
              "type": "give",
              "name": "pill",
              "value": {
                "type": "literal",
                "value": true
              },
              "line": 57
            },
            {
              "type": "when",
              "test": "clicked",
              "event": true,
              "children": [
                {
                  "type": "action",
                  "action": "emit",
                  "event": "selected",
                  "value": {
                    "type": "expression",
                    "value": "label"
                  },
                  "line": 59
                }
              ],
              "line": 58
            }
          ],
          "line": 57
        }
      ],
      "line": 54
    },
    {
      "name": "EventDemo",
      "body": [
        {
          "type": "state",
          "name": "selected",
          "initial": {
            "type": "literal",
            "value": "Aucun choix"
          },
          "line": 62
        },
        {
          "type": "show",
          "kind": "demoCard",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "tag",
              "content": {
                "type": "literal",
                "value": "Événement personnalisé"
              },
              "children": [
                {
                  "type": "give",
                  "name": "variant",
                  "value": {
                    "type": "literal",
                    "value": "brand"
                  },
                  "line": 65
                },
                {
                  "type": "give",
                  "name": "pill",
                  "value": {
                    "type": "literal",
                    "value": true
                  },
                  "line": 65
                }
              ],
              "line": 65
            },
            {
              "type": "show",
              "kind": "heading",
              "content": {
                "type": "literal",
                "value": "Le parent écoute l'enfant"
              },
              "children": [],
              "line": 66
            },
            {
              "type": "show",
              "kind": "message",
              "content": {
                "type": "literal",
                "value": "Choix reçu : {selected}"
              },
              "children": [],
              "line": 67
            },
            {
              "type": "show",
              "kind": "actions",
              "content": null,
              "children": [
                {
                  "type": "show",
                  "kind": "ChoiceEmitter",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "label",
                      "value": {
                        "type": "literal",
                        "value": "Simple"
                      },
                      "line": 69
                    },
                    {
                      "type": "when",
                      "test": "selected",
                      "event": true,
                      "children": [
                        {
                          "type": "action",
                          "action": "set",
                          "target": "selected",
                          "value": {
                            "type": "expression",
                            "value": "event"
                          },
                          "line": 71
                        }
                      ],
                      "line": 70
                    }
                  ],
                  "line": 69
                },
                {
                  "type": "show",
                  "kind": "ChoiceEmitter",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "label",
                      "value": {
                        "type": "literal",
                        "value": "Puissant"
                      },
                      "line": 72
                    },
                    {
                      "type": "when",
                      "test": "selected",
                      "event": true,
                      "children": [
                        {
                          "type": "action",
                          "action": "set",
                          "target": "selected",
                          "value": {
                            "type": "expression",
                            "value": "event"
                          },
                          "line": 74
                        }
                      ],
                      "line": 73
                    }
                  ],
                  "line": 72
                }
              ],
              "line": 68
            }
          ],
          "line": 64
        }
      ],
      "line": 61
    },
    {
      "name": "Hero",
      "body": [
        {
          "type": "show",
          "kind": "hero",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "heroCopy",
              "content": null,
              "children": [
                {
                  "type": "show",
                  "kind": "tag",
                  "content": {
                    "type": "literal",
                    "value": "Le frontend, enfin humain"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "variant",
                      "value": {
                        "type": "literal",
                        "value": "brand"
                      },
                      "line": 79
                    },
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "filled-outlined"
                      },
                      "line": 79
                    },
                    {
                      "type": "give",
                      "name": "pill",
                      "value": {
                        "type": "literal",
                        "value": true
                      },
                      "line": 79
                    }
                  ],
                  "line": 79
                },
                {
                  "type": "show",
                  "kind": "display",
                  "content": {
                    "type": "literal",
                    "value": "Décrivez votre interface. Intention fait le reste."
                  },
                  "children": [],
                  "line": 80
                },
                {
                  "type": "show",
                  "kind": "lead",
                  "content": {
                    "type": "literal",
                    "value": "Un framework réactif fondé sur les Web Components, avec une syntaxe que l'on comprend avant même de savoir coder."
                  },
                  "children": [],
                  "line": 81
                },
                {
                  "type": "show",
                  "kind": "actions",
                  "content": null,
                  "children": [
                    {
                      "type": "show",
                      "kind": "button",
                      "content": {
                        "type": "literal",
                        "value": "Créer ma première interface"
                      },
                      "children": [
                        {
                          "type": "give",
                          "name": "variant",
                          "value": {
                            "type": "literal",
                            "value": "brand"
                          },
                          "line": 83
                        },
                        {
                          "type": "give",
                          "name": "appearance",
                          "value": {
                            "type": "literal",
                            "value": "filled"
                          },
                          "line": 83
                        },
                        {
                          "type": "give",
                          "name": "size",
                          "value": {
                            "type": "literal",
                            "value": "large"
                          },
                          "line": 83
                        },
                        {
                          "type": "give",
                          "name": "href",
                          "value": {
                            "type": "literal",
                            "value": "/#start"
                          },
                          "line": 83
                        },
                        {
                          "type": "give",
                          "name": "pill",
                          "value": {
                            "type": "literal",
                            "value": true
                          },
                          "line": 83
                        }
                      ],
                      "line": 83
                    },
                    {
                      "type": "show",
                      "kind": "button",
                      "content": {
                        "type": "literal",
                        "value": "Voir la syntaxe"
                      },
                      "children": [
                        {
                          "type": "give",
                          "name": "appearance",
                          "value": {
                            "type": "literal",
                            "value": "outlined"
                          },
                          "line": 84
                        },
                        {
                          "type": "give",
                          "name": "size",
                          "value": {
                            "type": "literal",
                            "value": "large"
                          },
                          "line": 84
                        },
                        {
                          "type": "give",
                          "name": "href",
                          "value": {
                            "type": "literal",
                            "value": "/#language"
                          },
                          "line": 84
                        },
                        {
                          "type": "give",
                          "name": "pill",
                          "value": {
                            "type": "literal",
                            "value": true
                          },
                          "line": 84
                        }
                      ],
                      "line": 84
                    }
                  ],
                  "line": 82
                },
                {
                  "type": "show",
                  "kind": "trustLine",
                  "content": {
                    "type": "literal",
                    "value": "Open source · Sans JSX · Compatible avec vos composants"
                  },
                  "children": [],
                  "line": 85
                }
              ],
              "line": 78
            },
            {
              "type": "show",
              "kind": "heroVisual",
              "content": null,
              "children": [
                {
                  "type": "show",
                  "kind": "showcase",
                  "content": null,
                  "children": [
                    {
                      "type": "show",
                      "kind": "codeWindow",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "counter.intent"
                          },
                          "line": 89
                        },
                        {
                          "type": "give",
                          "name": "code",
                          "value": {
                            "type": "literal",
                            "value": "component Counter:\n  var count = 0\n\n  button \"Ajouter\":\n    on click:\n      count = count + 1\n\n  message \"Valeur : {count}\""
                          },
                          "line": 89
                        }
                      ],
                      "line": 89
                    },
                    {
                      "type": "show",
                      "kind": "CounterDemo",
                      "content": null,
                      "children": [],
                      "line": 90
                    }
                  ],
                  "line": 88
                }
              ],
              "line": 87
            }
          ],
          "line": 77
        }
      ],
      "line": 76
    },
    {
      "name": "FeatureCard",
      "body": [
        {
          "type": "input",
          "name": "symbol",
          "initial": {
            "type": "literal",
            "value": "spark"
          },
          "line": 93
        },
        {
          "type": "input",
          "name": "title",
          "initial": {
            "type": "literal",
            "value": "Une idée claire"
          },
          "line": 94
        },
        {
          "type": "input",
          "name": "description",
          "initial": {
            "type": "literal",
            "value": "Tout reste simple."
          },
          "line": 95
        },
        {
          "type": "show",
          "kind": "feature",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "symbol",
              "value": {
                "type": "expression",
                "value": "symbol"
              },
              "line": 97
            },
            {
              "type": "show",
              "kind": "heading",
              "content": {
                "type": "expression",
                "value": "title"
              },
              "children": [],
              "line": 98
            },
            {
              "type": "show",
              "kind": "message",
              "content": {
                "type": "expression",
                "value": "description"
              },
              "children": [],
              "line": 99
            }
          ],
          "line": 97
        }
      ],
      "line": 92
    },
    {
      "name": "Features",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "features"
                  },
                  "line": 103
                },
                {
                  "type": "show",
                  "kind": "eyebrow",
                  "content": {
                    "type": "literal",
                    "value": "Une autre façon de construire"
                  },
                  "children": [],
                  "line": 104
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "La puissance d'un framework moderne, sans sa charge mentale."
                  },
                  "children": [],
                  "line": 105
                },
                {
                  "type": "show",
                  "kind": "sectionLead",
                  "content": {
                    "type": "literal",
                    "value": "Intention retire la syntaxe accidentelle pour vous laisser penser au produit, aux interactions et aux utilisateurs."
                  },
                  "children": [],
                  "line": 106
                },
                {
                  "type": "show",
                  "kind": "grid",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "columns",
                      "value": {
                        "type": "literal",
                        "value": 3
                      },
                      "line": 108
                    },
                    {
                      "type": "give",
                      "name": "minimum",
                      "value": {
                        "type": "literal",
                        "value": 260
                      },
                      "line": 108
                    },
                    {
                      "type": "give",
                      "name": "gap",
                      "value": {
                        "type": "literal",
                        "value": 18
                      },
                      "line": 108
                    },
                    {
                      "type": "show",
                      "kind": "FeatureCard",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "symbol",
                          "value": {
                            "type": "literal",
                            "value": "read"
                          },
                          "line": 109
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Lisible immédiatement"
                          },
                          "line": 109
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Variables, composants et événements emploient des mots et des signes familiers."
                          },
                          "line": 109
                        }
                      ],
                      "line": 109
                    },
                    {
                      "type": "show",
                      "kind": "FeatureCard",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "symbol",
                          "value": {
                            "type": "literal",
                            "value": "react"
                          },
                          "line": 110
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Réactif par défaut"
                          },
                          "line": 110
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Modifiez une donnée. L'interface se remet à jour, sans hook ni gestion manuelle du DOM."
                          },
                          "line": 110
                        }
                      ],
                      "line": 110
                    },
                    {
                      "type": "show",
                      "kind": "FeatureCard",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "symbol",
                          "value": {
                            "type": "literal",
                            "value": "grid"
                          },
                          "line": 111
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Placement naturel"
                          },
                          "line": 111
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Une grille fluide, des largeurs simples et un repli mobile automatique."
                          },
                          "line": 111
                        }
                      ],
                      "line": 111
                    },
                    {
                      "type": "show",
                      "kind": "FeatureCard",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "symbol",
                          "value": {
                            "type": "literal",
                            "value": "blocks"
                          },
                          "line": 112
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Web Components natifs"
                          },
                          "line": 112
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Branchez un design system existant ou laissez Intention utiliser le HTML natif."
                          },
                          "line": 112
                        }
                      ],
                      "line": 112
                    },
                    {
                      "type": "show",
                      "kind": "FeatureCard",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "symbol",
                          "value": {
                            "type": "literal",
                            "value": "shield"
                          },
                          "line": 113
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Pas d'enfermement"
                          },
                          "line": 113
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Chaque composant Intention devient un véritable Custom Element utilisable partout."
                          },
                          "line": 113
                        }
                      ],
                      "line": 113
                    },
                    {
                      "type": "show",
                      "kind": "FeatureCard",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "symbol",
                          "value": {
                            "type": "literal",
                            "value": "bolt"
                          },
                          "line": 114
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Du prototype au produit"
                          },
                          "line": 114
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "La même écriture couvre l'état, les listes, les conditions et les interactions complexes."
                          },
                          "line": 114
                        }
                      ],
                      "line": 114
                    }
                  ],
                  "line": 108
                }
              ],
              "line": 103
            }
          ],
          "line": 102
        }
      ],
      "line": 101
    },
    {
      "name": "Language",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 80
              },
              "line": 117
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "language"
                  },
                  "line": 118
                },
                {
                  "type": "give",
                  "name": "tone",
                  "value": {
                    "type": "literal",
                    "value": "soft"
                  },
                  "line": 118
                },
                {
                  "type": "show",
                  "kind": "grid",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "columns",
                      "value": {
                        "type": "literal",
                        "value": 2
                      },
                      "line": 119
                    },
                    {
                      "type": "give",
                      "name": "minimum",
                      "value": {
                        "type": "literal",
                        "value": 340
                      },
                      "line": 119
                    },
                    {
                      "type": "give",
                      "name": "gap",
                      "value": {
                        "type": "literal",
                        "value": 48
                      },
                      "line": 119
                    },
                    {
                      "type": "show",
                      "kind": "column",
                      "content": null,
                      "children": [
                        {
                          "type": "show",
                          "kind": "eyebrow",
                          "content": {
                            "type": "literal",
                            "value": "Une syntaxe qui parle"
                          },
                          "children": [],
                          "line": 121
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Le code ressemble à ce que vous voulez obtenir."
                          },
                          "children": [],
                          "line": 122
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "Pas de balisage à fermer, pas d'accolades imbriquées, pas de convention cachée. Deux espaces suffisent à raconter la hiérarchie."
                          },
                          "children": [],
                          "line": 123
                        },
                        {
                          "type": "show",
                          "kind": "principles",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "principle",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "symbol",
                                  "value": {
                                    "type": "literal",
                                    "value": "01"
                                  },
                                  "line": 125
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Déclarez"
                                  },
                                  "line": 125
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Une variable se lit comme une variable : var count = 10"
                                  },
                                  "line": 125
                                }
                              ],
                              "line": 125
                            },
                            {
                              "type": "show",
                              "kind": "principle",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "symbol",
                                  "value": {
                                    "type": "literal",
                                    "value": "02"
                                  },
                                  "line": 126
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Composez"
                                  },
                                  "line": 126
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Un composant reçoit ses valeurs avec des paramètres explicites."
                                  },
                                  "line": 126
                                }
                              ],
                              "line": 126
                            },
                            {
                              "type": "show",
                              "kind": "principle",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "symbol",
                                  "value": {
                                    "type": "literal",
                                    "value": "03"
                                  },
                                  "line": 127
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Interagissez"
                                  },
                                  "line": 127
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "on click décrit l'événement, l'affectation décrit le résultat."
                                  },
                                  "line": 127
                                }
                              ],
                              "line": 127
                            }
                          ],
                          "line": 124
                        }
                      ],
                      "line": 120
                    },
                    {
                      "type": "show",
                      "kind": "codeWindow",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "dashboard.intent"
                          },
                          "line": 129
                        },
                        {
                          "type": "give",
                          "name": "code",
                          "value": {
                            "type": "literal",
                            "value": "component Dashboard:\n  grid(columns: 4, gap: 16):\n    Header(width: 4)\n    Navigation(width: 1)\n    MainContent(width: 3)\n\ncomponent Counter:\n  var count = 10\n\n  button \"+\":\n    on click:\n      count = count + 1"
                          },
                          "line": 129
                        }
                      ],
                      "line": 129
                    }
                  ],
                  "line": 119
                }
              ],
              "line": 118
            }
          ],
          "line": 117
        }
      ],
      "line": 116
    },
    {
      "name": "DemoPanel",
      "body": [
        {
          "type": "input",
          "name": "title",
          "initial": {
            "type": "literal",
            "value": "Produit"
          },
          "line": 132
        },
        {
          "type": "input",
          "name": "description",
          "initial": {
            "type": "literal",
            "value": "Description"
          },
          "line": 133
        },
        {
          "type": "show",
          "kind": "card",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "heading",
              "content": {
                "type": "expression",
                "value": "title"
              },
              "children": [],
              "line": 136
            },
            {
              "type": "show",
              "kind": "message",
              "content": {
                "type": "expression",
                "value": "description"
              },
              "children": [],
              "line": 137
            },
            {
              "type": "slot",
              "line": 138
            }
          ],
          "line": 135
        }
      ],
      "line": 131
    },
    {
      "name": "ReactivityDemo",
      "body": [
        {
          "type": "state",
          "name": "products",
          "initial": {
            "type": "literal",
            "value": [
              {
                "id": 1,
                "name": "Essentiel",
                "description": "Une base claire pour démarrer.",
                "available": true
              },
              {
                "id": 2,
                "name": "Studio",
                "description": "Pour composer une interface complète.",
                "available": true
              },
              {
                "id": 3,
                "name": "Archive",
                "description": "Cet élément est filtré automatiquement.",
                "available": false
              }
            ]
          },
          "line": 141
        },
        {
          "type": "derived",
          "name": "cartCount",
          "expression": "demoCart.length",
          "line": 142
        },
        {
          "type": "routine",
          "name": "add",
          "parameter": "product",
          "children": [
            {
              "type": "action",
              "action": "plus",
              "target": "demoCart",
              "value": {
                "type": "expression",
                "value": "product"
              },
              "line": 145
            }
          ],
          "line": 144
        },
        {
          "type": "show",
          "kind": "demoCard",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "tag",
              "content": {
                "type": "literal",
                "value": "Démo v0.6"
              },
              "children": [
                {
                  "type": "give",
                  "name": "variant",
                  "value": {
                    "type": "literal",
                    "value": "success"
                  },
                  "line": 148
                },
                {
                  "type": "give",
                  "name": "appearance",
                  "value": {
                    "type": "literal",
                    "value": "filled-outlined"
                  },
                  "line": 148
                },
                {
                  "type": "give",
                  "name": "pill",
                  "value": {
                    "type": "literal",
                    "value": true
                  },
                  "line": 148
                }
              ],
              "line": 148
            },
            {
              "type": "show",
              "kind": "heading",
              "content": {
                "type": "literal",
                "value": "{cartCount} sélection(s)"
              },
              "children": [],
              "line": 149
            },
            {
              "type": "show",
              "kind": "message",
              "content": {
                "type": "literal",
                "value": "Ajoutez des produits : l'état partagé et l'interface restent synchronisés."
              },
              "children": [],
              "line": 150
            },
            {
              "type": "show",
              "kind": "grid",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "columns",
                  "value": {
                    "type": "literal",
                    "value": 2
                  },
                  "line": 152
                },
                {
                  "type": "give",
                  "name": "minimum",
                  "value": {
                    "type": "literal",
                    "value": 190
                  },
                  "line": 152
                },
                {
                  "type": "give",
                  "name": "gap",
                  "value": {
                    "type": "literal",
                    "value": 14
                  },
                  "line": 152
                },
                {
                  "type": "each",
                  "item": "product",
                  "collection": "products",
                  "filter": "product.available",
                  "key": "product.id",
                  "children": [
                    {
                      "type": "show",
                      "kind": "DemoPanel",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "expression",
                            "value": "product.name"
                          },
                          "line": 154
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "expression",
                            "value": "product.description"
                          },
                          "line": 154
                        },
                        {
                          "type": "give",
                          "name": "key",
                          "value": {
                            "type": "expression",
                            "value": "product.id"
                          },
                          "line": 154
                        },
                        {
                          "type": "show",
                          "kind": "button",
                          "content": {
                            "type": "literal",
                            "value": "Ajouter"
                          },
                          "children": [
                            {
                              "type": "give",
                              "name": "variant",
                              "value": {
                                "type": "literal",
                                "value": "brand"
                              },
                              "line": 155
                            },
                            {
                              "type": "give",
                              "name": "appearance",
                              "value": {
                                "type": "literal",
                                "value": "outlined"
                              },
                              "line": 155
                            },
                            {
                              "type": "give",
                              "name": "pill",
                              "value": {
                                "type": "literal",
                                "value": true
                              },
                              "line": 155
                            },
                            {
                              "type": "when",
                              "test": "clicked",
                              "event": true,
                              "children": [
                                {
                                  "type": "action",
                                  "action": "routine",
                                  "routine": "add",
                                  "value": {
                                    "type": "expression",
                                    "value": "product"
                                  },
                                  "line": 157
                                }
                              ],
                              "line": 156
                            }
                          ],
                          "line": 155
                        }
                      ],
                      "line": 154
                    }
                  ],
                  "line": 153
                }
              ],
              "line": 152
            },
            {
              "type": "when",
              "test": "cartCount > 0",
              "children": [
                {
                  "type": "show",
                  "kind": "button",
                  "content": {
                    "type": "literal",
                    "value": "Réinitialiser"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "plain"
                      },
                      "line": 160
                    },
                    {
                      "type": "give",
                      "name": "pill",
                      "value": {
                        "type": "literal",
                        "value": true
                      },
                      "line": 160
                    },
                    {
                      "type": "when",
                      "test": "clicked",
                      "event": true,
                      "children": [
                        {
                          "type": "action",
                          "action": "reset",
                          "target": "demoCart",
                          "line": 162
                        }
                      ],
                      "line": 161
                    }
                  ],
                  "line": 160
                }
              ],
              "line": 159
            }
          ],
          "line": 147
        }
      ],
      "line": 140
    },
    {
      "name": "ReactivityShowcase",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 100
              },
              "line": 165
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "reactivity"
                  },
                  "line": 166
                },
                {
                  "type": "show",
                  "kind": "eyebrow",
                  "content": {
                    "type": "literal",
                    "value": "Une démo complète"
                  },
                  "children": [],
                  "line": 167
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "Les concepts avancés restent lisibles."
                  },
                  "children": [],
                  "line": 168
                },
                {
                  "type": "show",
                  "kind": "sectionLead",
                  "content": {
                    "type": "literal",
                    "value": "Cette démonstration utilise réellement shared, action, do, slot, where, key, computed et reset. Essayez-la : aucun code JavaScript applicatif n'est nécessaire."
                  },
                  "children": [],
                  "line": 169
                },
                {
                  "type": "show",
                  "kind": "grid",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "columns",
                      "value": {
                        "type": "literal",
                        "value": 2
                      },
                      "line": 171
                    },
                    {
                      "type": "give",
                      "name": "minimum",
                      "value": {
                        "type": "literal",
                        "value": 340
                      },
                      "line": 171
                    },
                    {
                      "type": "give",
                      "name": "gap",
                      "value": {
                        "type": "literal",
                        "value": 48
                      },
                      "line": 171
                    },
                    {
                      "type": "show",
                      "kind": "codeWindow",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "catalog.intent"
                          },
                          "line": 172
                        },
                        {
                          "type": "give",
                          "name": "code",
                          "value": {
                            "type": "literal",
                            "value": "shared cart = []\n\ncomponent Panel:\n  input title = \"Produit\"\n  card:\n    heading title\n    slot\n\ncomponent Catalog:\n  action add(product):\n    cart += product\n\n  each product in products where product.available key product.id:\n    Panel(title: product.name, key: product.id):\n      button \"Ajouter\":\n        on click:\n          do add with product\n\n  button \"Vider\":\n    on click:\n      reset cart"
                          },
                          "line": 172
                        }
                      ],
                      "line": 172
                    },
                    {
                      "type": "show",
                      "kind": "ReactivityDemo",
                      "content": null,
                      "children": [],
                      "line": 173
                    }
                  ],
                  "line": 171
                }
              ],
              "line": 166
            }
          ],
          "line": 165
        }
      ],
      "line": 164
    },
    {
      "name": "Process",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 100
              },
              "line": 176
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "show",
                  "kind": "eyebrow",
                  "content": {
                    "type": "literal",
                    "value": "Du texte à l'interface"
                  },
                  "children": [],
                  "line": 178
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "Trois étapes. Zéro magie obscure."
                  },
                  "children": [],
                  "line": 179
                },
                {
                  "type": "show",
                  "kind": "steps",
                  "content": null,
                  "children": [
                    {
                      "type": "show",
                      "kind": "step",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "number",
                          "value": {
                            "type": "literal",
                            "value": "01"
                          },
                          "line": 181
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Écrivez l'intention"
                          },
                          "line": 181
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Décrivez les composants, les données et les interactions dans un fichier .intent."
                          },
                          "line": 181
                        }
                      ],
                      "line": 181
                    },
                    {
                      "type": "show",
                      "kind": "step",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "number",
                          "value": {
                            "type": "literal",
                            "value": "02"
                          },
                          "line": 182
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Choisissez le design"
                          },
                          "line": 182
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Connectez Web Awesome, votre design system ou les éléments natifs du navigateur."
                          },
                          "line": 182
                        }
                      ],
                      "line": 182
                    },
                    {
                      "type": "show",
                      "kind": "step",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "number",
                          "value": {
                            "type": "literal",
                            "value": "03"
                          },
                          "line": 183
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Lancez"
                          },
                          "line": 183
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Intention compile le tout en composants Web standards, réactifs et autonomes."
                          },
                          "line": 183
                        }
                      ],
                      "line": 183
                    }
                  ],
                  "line": 180
                }
              ],
              "line": 177
            }
          ],
          "line": 176
        }
      ],
      "line": 175
    },
    {
      "name": "GettingStarted",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 80
              },
              "line": 186
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "docs"
                  },
                  "line": 187
                },
                {
                  "type": "give",
                  "name": "tone",
                  "value": {
                    "type": "literal",
                    "value": "soft"
                  },
                  "line": 187
                },
                {
                  "type": "show",
                  "kind": "eyebrow",
                  "content": {
                    "type": "literal",
                    "value": "Guide de démarrage"
                  },
                  "children": [],
                  "line": 188
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "De zéro à votre première interface en cinq minutes."
                  },
                  "children": [],
                  "line": 189
                },
                {
                  "type": "show",
                  "kind": "sectionLead",
                  "content": {
                    "type": "literal",
                    "value": "Intention fonctionne avec Node.js 20 ou plus récent. Une commande crée la structure, puis le serveur local rassemble et compile automatiquement tous les fichiers du projet."
                  },
                  "children": [],
                  "line": 190
                },
                {
                  "type": "show",
                  "kind": "grid",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "columns",
                      "value": {
                        "type": "literal",
                        "value": 2
                      },
                      "line": 192
                    },
                    {
                      "type": "give",
                      "name": "minimum",
                      "value": {
                        "type": "literal",
                        "value": 340
                      },
                      "line": 192
                    },
                    {
                      "type": "give",
                      "name": "gap",
                      "value": {
                        "type": "literal",
                        "value": 42
                      },
                      "line": 192
                    },
                    {
                      "type": "show",
                      "kind": "column",
                      "content": null,
                      "children": [
                        {
                          "type": "show",
                          "kind": "principles",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "principle",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "symbol",
                                  "value": {
                                    "type": "literal",
                                    "value": "01"
                                  },
                                  "line": 195
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Initialisez"
                                  },
                                  "line": 195
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "intent init mon-projet crée app.intent, les routes, les pages, les composants et les assets."
                                  },
                                  "line": 195
                                }
                              ],
                              "line": 195
                            },
                            {
                              "type": "show",
                              "kind": "principle",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "symbol",
                                  "value": {
                                    "type": "literal",
                                    "value": "02"
                                  },
                                  "line": 196
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Lancez"
                                  },
                                  "line": 196
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "npm run dev démarre le compilateur et le serveur SSR local sur le port 4173."
                                  },
                                  "line": 196
                                }
                              ],
                              "line": 196
                            },
                            {
                              "type": "show",
                              "kind": "principle",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "symbol",
                                  "value": {
                                    "type": "literal",
                                    "value": "03"
                                  },
                                  "line": 197
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Créez"
                                  },
                                  "line": 197
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Modifiez n'importe quel fichier .intent. Le navigateur reçoit automatiquement la nouvelle version."
                                  },
                                  "line": 197
                                }
                              ],
                              "line": 197
                            }
                          ],
                          "line": 194
                        },
                        {
                          "type": "show",
                          "kind": "actions",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "copyButton",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "value",
                                  "value": {
                                    "type": "literal",
                                    "value": "intent init mon-projet && cd mon-projet && npm run dev"
                                  },
                                  "line": 199
                                },
                                {
                                  "type": "give",
                                  "name": "copyLabel",
                                  "value": {
                                    "type": "literal",
                                    "value": "Copier les commandes"
                                  },
                                  "line": 199
                                },
                                {
                                  "type": "give",
                                  "name": "successLabel",
                                  "value": {
                                    "type": "literal",
                                    "value": "Commandes copiées"
                                  },
                                  "line": 199
                                }
                              ],
                              "line": 199
                            },
                            {
                              "type": "show",
                              "kind": "button",
                              "content": {
                                "type": "literal",
                                "value": "Consulter la référence"
                              },
                              "children": [
                                {
                                  "type": "give",
                                  "name": "variant",
                                  "value": {
                                    "type": "literal",
                                    "value": "brand"
                                  },
                                  "line": 200
                                },
                                {
                                  "type": "give",
                                  "name": "href",
                                  "value": {
                                    "type": "literal",
                                    "value": "/reference"
                                  },
                                  "line": 200
                                },
                                {
                                  "type": "give",
                                  "name": "pill",
                                  "value": {
                                    "type": "literal",
                                    "value": true
                                  },
                                  "line": 200
                                }
                              ],
                              "line": 200
                            }
                          ],
                          "line": 198
                        }
                      ],
                      "line": 193
                    },
                    {
                      "type": "show",
                      "kind": "column",
                      "content": null,
                      "children": [
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "Terminal"
                              },
                              "line": 203
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "intent init mon-projet\ncd mon-projet\nnpm run dev"
                              },
                              "line": 203
                            }
                          ],
                          "line": 203
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "app.intent"
                              },
                              "line": 204
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "application = \"Mon application\"\nstart = Home"
                              },
                              "line": 204
                            }
                          ],
                          "line": 204
                        }
                      ],
                      "line": 202
                    }
                  ],
                  "line": 192
                }
              ],
              "line": 187
            }
          ],
          "line": 186
        }
      ],
      "line": 185
    },
    {
      "name": "LanguageReference",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 100
              },
              "line": 207
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "reference"
                  },
                  "line": 208
                },
                {
                  "type": "show",
                  "kind": "eyebrow",
                  "content": {
                    "type": "literal",
                    "value": "Référence rapide"
                  },
                  "children": [],
                  "line": 209
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "Le langage essentiel, sur une seule page."
                  },
                  "children": [],
                  "line": 210
                },
                {
                  "type": "show",
                  "kind": "sectionLead",
                  "content": {
                    "type": "literal",
                    "value": "Chaque concept suit la même logique : une intention par ligne, deux espaces pour entrer dans un bloc et des paramètres nommés quand ils sont utiles."
                  },
                  "children": [],
                  "line": 211
                },
                {
                  "type": "show",
                  "kind": "docsGrid",
                  "content": null,
                  "children": [
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "var"
                          },
                          "line": 214
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "État réactif"
                          },
                          "line": 214
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Une valeur modifiable qui met automatiquement l'interface à jour."
                          },
                          "line": 214
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "var count = 0"
                          },
                          "line": 214
                        }
                      ],
                      "line": 214
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "computed"
                          },
                          "line": 215
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Valeur calculée"
                          },
                          "line": 215
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Une expression toujours recalculée depuis l'état courant."
                          },
                          "line": 215
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "computed total = price * quantity"
                          },
                          "line": 215
                        }
                      ],
                      "line": 215
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "shared"
                          },
                          "line": 216
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "État partagé"
                          },
                          "line": 216
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Une valeur disponible et réactive dans tous les composants."
                          },
                          "line": 216
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "shared theme = \"light\""
                          },
                          "line": 216
                        }
                      ],
                      "line": 216
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "action"
                          },
                          "line": 217
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Logique réutilisable"
                          },
                          "line": 217
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Regroupez des changements et appelez-les avec do."
                          },
                          "line": 217
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "action add(product):"
                          },
                          "line": 217
                        }
                      ],
                      "line": 217
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "slot"
                          },
                          "line": 218
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Composition"
                          },
                          "line": 218
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Choisissez où afficher le contenu fourni par le parent."
                          },
                          "line": 218
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "slot"
                          },
                          "line": 218
                        }
                      ],
                      "line": 218
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "load"
                          },
                          "line": 219
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Données distantes"
                          },
                          "line": 219
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Chargez une URL avec les états de chargement et d'erreur automatiques."
                          },
                          "line": 219
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "load products from \"/api/products\""
                          },
                          "line": 219
                        }
                      ],
                      "line": 219
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "if / else"
                          },
                          "line": 220
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Conditions"
                          },
                          "line": 220
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Affichez un bloc ou son alternative selon une expression."
                          },
                          "line": 220
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "if ready:  …  else: …"
                          },
                          "line": 220
                        }
                      ],
                      "line": 220
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "each"
                          },
                          "line": 221
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Listes"
                          },
                          "line": 221
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Répétez une interface pour chaque valeur d'une collection."
                          },
                          "line": 221
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "each product in products:"
                          },
                          "line": 221
                        }
                      ],
                      "line": 221
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "grid"
                          },
                          "line": 222
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Placement"
                          },
                          "line": 222
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Composez une grille responsive sans écrire de CSS."
                          },
                          "line": 222
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "grid(columns: 3, gap: 16):"
                          },
                          "line": 222
                        }
                      ],
                      "line": 222
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "input"
                          },
                          "line": 223
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Entrées"
                          },
                          "line": 223
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Transmettez des données typées naturellement du parent vers l'enfant."
                          },
                          "line": 223
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "ProductCard(title: title)"
                          },
                          "line": 223
                        }
                      ],
                      "line": 223
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "on"
                          },
                          "line": 224
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Événements"
                          },
                          "line": 224
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Réagissez aux clics, changements, envois et événements métier."
                          },
                          "line": 224
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "on click:"
                          },
                          "line": 224
                        }
                      ],
                      "line": 224
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "emit"
                          },
                          "line": 225
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Communication"
                          },
                          "line": 225
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Envoyez une valeur d'un composant enfant vers son parent."
                          },
                          "line": 225
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "emit selected with product"
                          },
                          "line": 225
                        }
                      ],
                      "line": 225
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "library"
                          },
                          "line": 226
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Design systems"
                          },
                          "line": 226
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Embarquez une bibliothèque de Web Components installée."
                          },
                          "line": 226
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "library = \"webawesome\""
                          },
                          "line": 226
                        }
                      ],
                      "line": 226
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "routes"
                          },
                          "line": 227
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Pages SSR"
                          },
                          "line": 227
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Associez directement un composant de page à une URL rendue par le serveur."
                          },
                          "line": 227
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "Documentation: \"/docs\""
                          },
                          "line": 227
                        }
                      ],
                      "line": 227
                    },
                    {
                      "type": "show",
                      "kind": "docItem",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "keyword",
                          "value": {
                            "type": "literal",
                            "value": "href"
                          },
                          "line": 228
                        },
                        {
                          "type": "give",
                          "name": "title",
                          "value": {
                            "type": "literal",
                            "value": "Navigation fluide"
                          },
                          "line": 228
                        },
                        {
                          "type": "give",
                          "name": "description",
                          "value": {
                            "type": "literal",
                            "value": "Passez d'une page à l'autre sans rechargement tout en gardant l'historique."
                          },
                          "line": 228
                        },
                        {
                          "type": "give",
                          "name": "syntax",
                          "value": {
                            "type": "literal",
                            "value": "button(href: \"/docs\")"
                          },
                          "line": 228
                        }
                      ],
                      "line": 228
                    }
                  ],
                  "line": 213
                }
              ],
              "line": 208
            }
          ],
          "line": 207
        }
      ],
      "line": 206
    },
    {
      "name": "Communication",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 100
              },
              "line": 231
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "events"
                  },
                  "line": 232
                },
                {
                  "type": "give",
                  "name": "tone",
                  "value": {
                    "type": "literal",
                    "value": "dark"
                  },
                  "line": 232
                },
                {
                  "type": "show",
                  "kind": "grid",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "columns",
                      "value": {
                        "type": "literal",
                        "value": 2
                      },
                      "line": 233
                    },
                    {
                      "type": "give",
                      "name": "minimum",
                      "value": {
                        "type": "literal",
                        "value": 340
                      },
                      "line": 233
                    },
                    {
                      "type": "give",
                      "name": "gap",
                      "value": {
                        "type": "literal",
                        "value": 48
                      },
                      "line": 233
                    },
                    {
                      "type": "show",
                      "kind": "column",
                      "content": null,
                      "children": [
                        {
                          "type": "show",
                          "kind": "eyebrow",
                          "content": {
                            "type": "literal",
                            "value": "Composants qui communiquent"
                          },
                          "children": [],
                          "line": 235
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Un enfant émet. Son parent écoute."
                          },
                          "children": [],
                          "line": 236
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "Les événements personnalisés évitent les callbacks et gardent les composants autonomes. La valeur envoyée devient simplement event dans le parent."
                          },
                          "children": [],
                          "line": 237
                        },
                        {
                          "type": "show",
                          "kind": "EventDemo",
                          "content": null,
                          "children": [],
                          "line": 238
                        }
                      ],
                      "line": 234
                    },
                    {
                      "type": "show",
                      "kind": "codeWindow",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "events.intent"
                          },
                          "line": 240
                        },
                        {
                          "type": "give",
                          "name": "code",
                          "value": {
                            "type": "literal",
                            "value": "component ProductCard:\n  input product = {}\n\n  button \"Choisir\":\n    on click:\n      emit selected with product\n\ncomponent Catalog:\n  var choice = {}\n\n  ProductCard(product: featured):\n    on selected:\n      choice = event"
                          },
                          "line": 240
                        }
                      ],
                      "line": 240
                    }
                  ],
                  "line": 233
                }
              ],
              "line": 232
            }
          ],
          "line": 231
        }
      ],
      "line": 230
    },
    {
      "name": "Components",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 120
              },
              "line": 243
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "components"
                  },
                  "line": 244
                },
                {
                  "type": "give",
                  "name": "tone",
                  "value": {
                    "type": "literal",
                    "value": "dark"
                  },
                  "line": 244
                },
                {
                  "type": "show",
                  "kind": "grid",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "columns",
                      "value": {
                        "type": "literal",
                        "value": 2
                      },
                      "line": 245
                    },
                    {
                      "type": "give",
                      "name": "minimum",
                      "value": {
                        "type": "literal",
                        "value": 340
                      },
                      "line": 245
                    },
                    {
                      "type": "give",
                      "name": "gap",
                      "value": {
                        "type": "literal",
                        "value": 56
                      },
                      "line": 245
                    },
                    {
                      "type": "show",
                      "kind": "column",
                      "content": null,
                      "children": [
                        {
                          "type": "show",
                          "kind": "eyebrow",
                          "content": {
                            "type": "literal",
                            "value": "Compatible par nature"
                          },
                          "children": [],
                          "line": 247
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Votre design system devient le vocabulaire du produit."
                          },
                          "children": [],
                          "line": 248
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "Ce site utilise réellement Web Awesome. Intention transmet les propriétés et les événements aux Web Components, sans adaptateur lourd."
                          },
                          "children": [],
                          "line": 249
                        },
                        {
                          "type": "show",
                          "kind": "techStrip",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "tag",
                              "content": {
                                "type": "literal",
                                "value": "Web Awesome"
                              },
                              "children": [
                                {
                                  "type": "give",
                                  "name": "variant",
                                  "value": {
                                    "type": "literal",
                                    "value": "brand"
                                  },
                                  "line": 251
                                },
                                {
                                  "type": "give",
                                  "name": "pill",
                                  "value": {
                                    "type": "literal",
                                    "value": true
                                  },
                                  "line": 251
                                }
                              ],
                              "line": 251
                            },
                            {
                              "type": "show",
                              "kind": "tag",
                              "content": {
                                "type": "literal",
                                "value": "Shoelace"
                              },
                              "children": [
                                {
                                  "type": "give",
                                  "name": "pill",
                                  "value": {
                                    "type": "literal",
                                    "value": true
                                  },
                                  "line": 252
                                }
                              ],
                              "line": 252
                            },
                            {
                              "type": "show",
                              "kind": "tag",
                              "content": {
                                "type": "literal",
                                "value": "Material Web"
                              },
                              "children": [
                                {
                                  "type": "give",
                                  "name": "pill",
                                  "value": {
                                    "type": "literal",
                                    "value": true
                                  },
                                  "line": 253
                                }
                              ],
                              "line": 253
                            },
                            {
                              "type": "show",
                              "kind": "tag",
                              "content": {
                                "type": "literal",
                                "value": "Design system maison"
                              },
                              "children": [
                                {
                                  "type": "give",
                                  "name": "pill",
                                  "value": {
                                    "type": "literal",
                                    "value": true
                                  },
                                  "line": 254
                                }
                              ],
                              "line": 254
                            }
                          ],
                          "line": 250
                        }
                      ],
                      "line": 246
                    },
                    {
                      "type": "show",
                      "kind": "codeWindow",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "design.js"
                          },
                          "line": 256
                        },
                        {
                          "type": "give",
                          "name": "code",
                          "value": {
                            "type": "literal",
                            "value": "export default {\n  button: {\n    tag: \"wa-button\",\n    properties: {\n      disabled: \"disabled\"\n    }\n  },\n  card: { tag: \"wa-card\" }\n}"
                          },
                          "line": 256
                        }
                      ],
                      "line": 256
                    }
                  ],
                  "line": 245
                }
              ],
              "line": 244
            }
          ],
          "line": 243
        }
      ],
      "line": 242
    },
    {
      "name": "FAQ",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 80
              },
              "line": 259
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "faq"
                  },
                  "line": 260
                },
                {
                  "type": "give",
                  "name": "tone",
                  "value": {
                    "type": "literal",
                    "value": "soft"
                  },
                  "line": 260
                },
                {
                  "type": "show",
                  "kind": "eyebrow",
                  "content": {
                    "type": "literal",
                    "value": "Questions fréquentes"
                  },
                  "children": [],
                  "line": 261
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "Tout ce qu'il faut savoir avant de commencer."
                  },
                  "children": [],
                  "line": 262
                },
                {
                  "type": "show",
                  "kind": "faqList",
                  "content": null,
                  "children": [
                    {
                      "type": "show",
                      "kind": "faq",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "question",
                          "value": {
                            "type": "literal",
                            "value": "Faut-il connaître HTML ou React ?"
                          },
                          "line": 264
                        },
                        {
                          "type": "give",
                          "name": "answer",
                          "value": {
                            "type": "literal",
                            "value": "Non. Intention décrit directement les composants, les données et les interactions. Quelques notions générales de logique suffisent pour commencer."
                          },
                          "line": 264
                        }
                      ],
                      "line": 264
                    },
                    {
                      "type": "show",
                      "kind": "faq",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "question",
                          "value": {
                            "type": "literal",
                            "value": "Puis-je utiliser mon propre design system ?"
                          },
                          "line": 265
                        },
                        {
                          "type": "give",
                          "name": "answer",
                          "value": {
                            "type": "literal",
                            "value": "Oui. Une simple table de correspondance relie les concepts Intention à vos Custom Elements, leurs propriétés et leurs événements."
                          },
                          "line": 265
                        }
                      ],
                      "line": 265
                    },
                    {
                      "type": "show",
                      "kind": "faq",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "question",
                          "value": {
                            "type": "literal",
                            "value": "Que se passe-t-il sans Web Component ?"
                          },
                          "line": 266
                        },
                        {
                          "type": "give",
                          "name": "answer",
                          "value": {
                            "type": "literal",
                            "value": "Intention utilise automatiquement un élément HTML natif équivalent. Un concept inconnu retombe sur un div neutre."
                          },
                          "line": 266
                        }
                      ],
                      "line": 266
                    },
                    {
                      "type": "show",
                      "kind": "faq",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "question",
                          "value": {
                            "type": "literal",
                            "value": "Le placement fonctionne-t-il sur mobile ?"
                          },
                          "line": 267
                        },
                        {
                          "type": "give",
                          "name": "answer",
                          "value": {
                            "type": "literal",
                            "value": "Oui. minimum définit la largeur souhaitée d'une colonne ; Intention réduit ensuite leur nombre et replace les composants dans l'ordre naturel."
                          },
                          "line": 267
                        }
                      ],
                      "line": 267
                    },
                    {
                      "type": "show",
                      "kind": "faq",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "question",
                          "value": {
                            "type": "literal",
                            "value": "L'autocomplétion connaît-elle mes composants ?"
                          },
                          "line": 268
                        },
                        {
                          "type": "give",
                          "name": "answer",
                          "value": {
                            "type": "literal",
                            "value": "Oui. L'extension VS Code détecte leurs inputs et les événements qu'ils émettent pour proposer les bonnes écritures au bon endroit."
                          },
                          "line": 268
                        }
                      ],
                      "line": 268
                    }
                  ],
                  "line": 263
                }
              ],
              "line": 260
            }
          ],
          "line": 259
        }
      ],
      "line": 258
    },
    {
      "name": "Start",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 100
              },
              "line": 271
            },
            {
              "type": "show",
              "kind": "cta",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "start"
                  },
                  "line": 272
                },
                {
                  "type": "show",
                  "kind": "tag",
                  "content": {
                    "type": "literal",
                    "value": "Intention v0.6"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "variant",
                      "value": {
                        "type": "literal",
                        "value": "brand"
                      },
                      "line": 273
                    },
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "filled"
                      },
                      "line": 273
                    },
                    {
                      "type": "give",
                      "name": "pill",
                      "value": {
                        "type": "literal",
                        "value": true
                      },
                      "line": 273
                    }
                  ],
                  "line": 273
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "Une interface devrait commencer par une idée, pas par du boilerplate."
                  },
                  "children": [],
                  "line": 274
                },
                {
                  "type": "show",
                  "kind": "lead",
                  "content": {
                    "type": "literal",
                    "value": "Clonez le projet, lancez le serveur local et écrivez votre premier composant en moins de cinq minutes."
                  },
                  "children": [],
                  "line": 275
                },
                {
                  "type": "show",
                  "kind": "actions",
                  "content": null,
                  "children": [
                    {
                      "type": "show",
                      "kind": "button",
                      "content": {
                        "type": "literal",
                        "value": "Suivre le guide"
                      },
                      "children": [
                        {
                          "type": "give",
                          "name": "variant",
                          "value": {
                            "type": "literal",
                            "value": "brand"
                          },
                          "line": 277
                        },
                        {
                          "type": "give",
                          "name": "appearance",
                          "value": {
                            "type": "literal",
                            "value": "filled"
                          },
                          "line": 277
                        },
                        {
                          "type": "give",
                          "name": "size",
                          "value": {
                            "type": "literal",
                            "value": "large"
                          },
                          "line": 277
                        },
                        {
                          "type": "give",
                          "name": "href",
                          "value": {
                            "type": "literal",
                            "value": "/docs"
                          },
                          "line": 277
                        },
                        {
                          "type": "give",
                          "name": "pill",
                          "value": {
                            "type": "literal",
                            "value": true
                          },
                          "line": 277
                        }
                      ],
                      "line": 277
                    },
                    {
                      "type": "show",
                      "kind": "copyButton",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "value",
                          "value": {
                            "type": "literal",
                            "value": "npm run dev"
                          },
                          "line": 278
                        },
                        {
                          "type": "give",
                          "name": "copyLabel",
                          "value": {
                            "type": "literal",
                            "value": "Copier la commande"
                          },
                          "line": 278
                        },
                        {
                          "type": "give",
                          "name": "successLabel",
                          "value": {
                            "type": "literal",
                            "value": "Commande copiée"
                          },
                          "line": 278
                        }
                      ],
                      "line": 278
                    }
                  ],
                  "line": 276
                }
              ],
              "line": 272
            }
          ],
          "line": 271
        }
      ],
      "line": 270
    },
    {
      "name": "Footer",
      "body": [
        {
          "type": "show",
          "kind": "footer",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "Logo",
              "content": null,
              "children": [],
              "line": 282
            },
            {
              "type": "show",
              "kind": "message",
              "content": {
                "type": "literal",
                "value": "Pensé pour rendre le développement frontend accessible, sans renoncer à la puissance."
              },
              "children": [],
              "line": 283
            },
            {
              "type": "show",
              "kind": "text",
              "content": {
                "type": "literal",
                "value": "© 2026 Intention"
              },
              "children": [],
              "line": 284
            }
          ],
          "line": 281
        }
      ],
      "line": 280
    },
    {
      "name": "RoutingGuide",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 90
              },
              "line": 287
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "routing"
                  },
                  "line": 288
                },
                {
                  "type": "give",
                  "name": "tone",
                  "value": {
                    "type": "literal",
                    "value": "soft"
                  },
                  "line": 288
                },
                {
                  "type": "show",
                  "kind": "grid",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "columns",
                      "value": {
                        "type": "literal",
                        "value": 2
                      },
                      "line": 289
                    },
                    {
                      "type": "give",
                      "name": "minimum",
                      "value": {
                        "type": "literal",
                        "value": 340
                      },
                      "line": 289
                    },
                    {
                      "type": "give",
                      "name": "gap",
                      "value": {
                        "type": "literal",
                        "value": 48
                      },
                      "line": 289
                    },
                    {
                      "type": "show",
                      "kind": "column",
                      "content": null,
                      "children": [
                        {
                          "type": "show",
                          "kind": "eyebrow",
                          "content": {
                            "type": "literal",
                            "value": "Routing SSR"
                          },
                          "children": [],
                          "line": 291
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Une page se déclare comme une ligne de configuration."
                          },
                          "children": [],
                          "line": 292
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "Le serveur envoie déjà le contenu de la bonne page. Ensuite, Intention rend les navigations instantanées, conserve l'historique et active les Web Components."
                          },
                          "children": [],
                          "line": 293
                        },
                        {
                          "type": "show",
                          "kind": "principles",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "principle",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "symbol",
                                  "value": {
                                    "type": "literal",
                                    "value": "01"
                                  },
                                  "line": 295
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Nommez"
                                  },
                                  "line": 295
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Le nom de la route correspond simplement au composant de page."
                                  },
                                  "line": 295
                                }
                              ],
                              "line": 295
                            },
                            {
                              "type": "show",
                              "kind": "principle",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "symbol",
                                  "value": {
                                    "type": "literal",
                                    "value": "02"
                                  },
                                  "line": 296
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Associez"
                                  },
                                  "line": 296
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Donnez-lui une URL commençant par un slash."
                                  },
                                  "line": 296
                                }
                              ],
                              "line": 296
                            },
                            {
                              "type": "show",
                              "kind": "principle",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "symbol",
                                  "value": {
                                    "type": "literal",
                                    "value": "03"
                                  },
                                  "line": 297
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Naviguez"
                                  },
                                  "line": 297
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Un href vers cette URL utilise automatiquement le routeur."
                                  },
                                  "line": 297
                                }
                              ],
                              "line": 297
                            }
                          ],
                          "line": 294
                        }
                      ],
                      "line": 290
                    },
                    {
                      "type": "show",
                      "kind": "codeWindow",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "app.intent"
                          },
                          "line": 299
                        },
                        {
                          "type": "give",
                          "name": "code",
                          "value": {
                            "type": "literal",
                            "value": "routes:\n  Home: \"/\"\n  Documentation: \"/docs\"\n  Product: \"/products/:id\"\n  NotFound: \"*\"\n\ncomponent Product:\n  input id = \"\"\n  heading \"Produit {id}\""
                          },
                          "line": 299
                        }
                      ],
                      "line": 299
                    }
                  ],
                  "line": 289
                }
              ],
              "line": 288
            }
          ],
          "line": 287
        }
      ],
      "line": 286
    },
    {
      "name": "PersistentDemo",
      "body": [
        {
          "type": "state",
          "name": "visits",
          "initial": {
            "type": "literal",
            "value": 0
          },
          "persistent": true,
          "line": 302
        },
        {
          "type": "show",
          "kind": "demoCard",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "tag",
              "content": {
                "type": "literal",
                "value": "État persistant"
              },
              "children": [
                {
                  "type": "give",
                  "name": "variant",
                  "value": {
                    "type": "literal",
                    "value": "success"
                  },
                  "line": 305
                },
                {
                  "type": "give",
                  "name": "pill",
                  "value": {
                    "type": "literal",
                    "value": true
                  },
                  "line": 305
                }
              ],
              "line": 305
            },
            {
              "type": "show",
              "kind": "heading",
              "content": {
                "type": "literal",
                "value": "Cette valeur survit au rechargement"
              },
              "children": [],
              "line": 306
            },
            {
              "type": "show",
              "kind": "message",
              "content": {
                "type": "literal",
                "value": "Interactions enregistrées : {visits}"
              },
              "children": [],
              "line": 307
            },
            {
              "type": "show",
              "kind": "actions",
              "content": null,
              "children": [
                {
                  "type": "show",
                  "kind": "button",
                  "content": {
                    "type": "literal",
                    "value": "Ajouter"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "variant",
                      "value": {
                        "type": "literal",
                        "value": "brand"
                      },
                      "line": 309
                    },
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "filled"
                      },
                      "line": 309
                    },
                    {
                      "type": "give",
                      "name": "pill",
                      "value": {
                        "type": "literal",
                        "value": true
                      },
                      "line": 309
                    },
                    {
                      "type": "when",
                      "test": "clicked",
                      "event": true,
                      "children": [
                        {
                          "type": "action",
                          "action": "set",
                          "target": "visits",
                          "value": {
                            "type": "expression",
                            "value": "visits + 1"
                          },
                          "line": 311
                        }
                      ],
                      "line": 310
                    }
                  ],
                  "line": 309
                },
                {
                  "type": "show",
                  "kind": "button",
                  "content": {
                    "type": "literal",
                    "value": "Remettre à zéro"
                  },
                  "children": [
                    {
                      "type": "give",
                      "name": "appearance",
                      "value": {
                        "type": "literal",
                        "value": "outlined"
                      },
                      "line": 312
                    },
                    {
                      "type": "give",
                      "name": "pill",
                      "value": {
                        "type": "literal",
                        "value": true
                      },
                      "line": 312
                    },
                    {
                      "type": "when",
                      "test": "clicked",
                      "event": true,
                      "children": [
                        {
                          "type": "action",
                          "action": "set",
                          "target": "visits",
                          "value": {
                            "type": "literal",
                            "value": 0
                          },
                          "line": 314
                        }
                      ],
                      "line": 313
                    }
                  ],
                  "line": 312
                }
              ],
              "line": 308
            }
          ],
          "line": 304
        }
      ],
      "line": 301
    },
    {
      "name": "DocumentationManual",
      "body": [
        {
          "type": "show",
          "kind": "reveal",
          "content": null,
          "children": [
            {
              "type": "give",
              "name": "delay",
              "value": {
                "type": "literal",
                "value": 60
              },
              "line": 317
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "anchor",
                  "value": {
                    "type": "literal",
                    "value": "manual"
                  },
                  "line": 318
                },
                {
                  "type": "show",
                  "kind": "eyebrow",
                  "content": {
                    "type": "literal",
                    "value": "Manuel complet"
                  },
                  "children": [],
                  "line": 319
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "Chaque notion expliquée, puis montrée avec du vrai code."
                  },
                  "children": [],
                  "line": 320
                },
                {
                  "type": "show",
                  "kind": "sectionLead",
                  "content": {
                    "type": "literal",
                    "value": "Parcourez les onglets dans l'ordre pour apprendre Intention, ou ouvrez directement le sujet dont vous avez besoin. Chaque partie contient plusieurs exemples prêts à adapter."
                  },
                  "children": [],
                  "line": 321
                },
                {
                  "type": "show",
                  "kind": "docsTabs",
                  "content": null,
                  "children": [
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Démarrage"
                          },
                          "line": 324
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Créer et lancer une application"
                          },
                          "children": [],
                          "line": 325
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "app.intent nomme l'application, choisit éventuellement un design system et indique le composant de départ. Le reste du projet se range par rôle."
                          },
                          "children": [],
                          "line": 326
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "app.intent"
                              },
                              "line": 327
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "application = \"Mon application\"\nlibrary = \"webawesome\"\ndesign = \"./design.js\"\nstart = Home"
                              },
                              "line": 327
                            }
                          ],
                          "line": 327
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "terminal"
                              },
                              "line": 328
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "npm run dev\n# développement SSR avec rechargement\n\nnpm start\n# serveur SSR sans surveillance\n\nnpm run build\n# pages HTML prérendues dans dist/"
                              },
                              "line": 328
                            }
                          ],
                          "line": 328
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "application"
                                  },
                                  "line": 330
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Nom de l'application"
                                  },
                                  "line": 330
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Utilisé comme titre de document et base des titres de pages."
                                  },
                                  "line": 330
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "application = \"Mon produit\""
                                  },
                                  "line": 330
                                }
                              ],
                              "line": 330
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "design"
                                  },
                                  "line": 331
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Design system"
                                  },
                                  "line": 331
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Charge la table qui relie les concepts aux Web Components."
                                  },
                                  "line": 331
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "design = \"./design.js\""
                                  },
                                  "line": 331
                                }
                              ],
                              "line": 331
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "library"
                                  },
                                  "line": 332
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Bibliothèque"
                                  },
                                  "line": 332
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Demande au compilateur d'embarquer une bibliothèque prise en charge."
                                  },
                                  "line": 332
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "library = \"webawesome\""
                                  },
                                  "line": 332
                                }
                              ],
                              "line": 332
                            }
                          ],
                          "line": 329
                        }
                      ],
                      "line": 324
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Projet & CLI"
                          },
                          "line": 334
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Une architecture familière, sans imports à maintenir"
                          },
                          "children": [],
                          "line": 335
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "app.intent configure l'application. Les routes, pages, composants et assets vivent dans des emplacements prévisibles, découverts automatiquement par Intention."
                          },
                          "children": [],
                          "line": 336
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "Terminal"
                              },
                              "line": 337
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "intent init mon-projet\ncd mon-projet\nnpm run dev\n\n# Production\nnpm run build\nnpm start"
                              },
                              "line": 337
                            }
                          ],
                          "line": 337
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "Arborescence"
                              },
                              "line": 338
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "mon-projet/\n├── app.intent\n├── routes.intent\n├── components/\n│   └── QuickLink.intent\n├── pages/\n│   ├── Home.intent\n│   └── NotFound.intent\n├── design/\n│   └── starter-design.js\n├── assets/\n│   └── intention-ribbon.png\n└── package.json"
                              },
                              "line": 338
                            }
                          ],
                          "line": 338
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "routes.intent"
                              },
                              "line": 339
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "routes:\n  Home: \"/\"\n  NotFound: \"*\""
                              },
                              "line": 339
                            }
                          ],
                          "line": 339
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "app.intent"
                                  },
                                  "line": 341
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Point d'entrée"
                                  },
                                  "line": 341
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Définit le nom, le design et le composant de départ."
                                  },
                                  "line": 341
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "start = Home"
                                  },
                                  "line": 341
                                }
                              ],
                              "line": 341
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "components/"
                                  },
                                  "line": 342
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Blocs réutilisables"
                                  },
                                  "line": 342
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Tous les fichiers .intent sont découverts récursivement."
                                  },
                                  "line": 342
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "components/Card.intent"
                                  },
                                  "line": 342
                                }
                              ],
                              "line": 342
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "pages/"
                                  },
                                  "line": 343
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Écrans routés"
                                  },
                                  "line": 343
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Chaque page reste un composant Intention ordinaire."
                                  },
                                  "line": 343
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "pages/Home.intent"
                                  },
                                  "line": 343
                                }
                              ],
                              "line": 343
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "assets/"
                                  },
                                  "line": 344
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Fichiers statiques"
                                  },
                                  "line": 344
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Images et polices sont copiées automatiquement vers dist/assets."
                                  },
                                  "line": 344
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "assets/logo.svg"
                                  },
                                  "line": 344
                                }
                              ],
                              "line": 344
                            }
                          ],
                          "line": 340
                        }
                      ],
                      "line": 334
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Composants"
                          },
                          "line": 346
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Composer sans balisage ni fermeture"
                          },
                          "children": [],
                          "line": 347
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "Un composant regroupe son état et son interface. input définit ce que le parent peut lui transmettre ; les paramètres nommés rendent chaque utilisation explicite."
                          },
                          "children": [],
                          "line": 348
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "profile.intent"
                              },
                              "line": 349
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component ProfileCard:\n  input name = \"Visiteur\"\n  input role = \"Membre\"\n\n  card:\n    heading name\n    message role\n\ncomponent Team:\n  ProfileCard(name: \"Ada\", role: \"Design\")\n  ProfileCard(name: \"Grace\", role: \"Engineering\")"
                              },
                              "line": 349
                            }
                          ],
                          "line": 349
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "events.intent"
                              },
                              "line": 350
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Picker:\n  input value = \"Simple\"\n\n  button value:\n    on click:\n      emit selected with value\n\ncomponent App:\n  var choice = \"\"\n  Picker(value: \"Puissant\"):\n    on selected:\n      choice = event"
                              },
                              "line": 350
                            }
                          ],
                          "line": 350
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "component"
                                  },
                                  "line": 352
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Composant autonome"
                                  },
                                  "line": 352
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Devient un véritable Custom Element préfixé par intent-."
                                  },
                                  "line": 352
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "component ProfileCard:"
                                  },
                                  "line": 352
                                }
                              ],
                              "line": 352
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "input"
                                  },
                                  "line": 353
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Entrée explicite"
                                  },
                                  "line": 353
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Reçoit une valeur du parent avec une valeur par défaut."
                                  },
                                  "line": 353
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "input title = \"Titre\""
                                  },
                                  "line": 353
                                }
                              ],
                              "line": 353
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "emit"
                                  },
                                  "line": 354
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Événement métier"
                                  },
                                  "line": 354
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Transmet une valeur au parent sans callback ni prop spéciale."
                                  },
                                  "line": 354
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "emit selected with product"
                                  },
                                  "line": 354
                                }
                              ],
                              "line": 354
                            }
                          ],
                          "line": 351
                        }
                      ],
                      "line": 346
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "État"
                          },
                          "line": 356
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "État réactif, calculé ou persistant"
                          },
                          "children": [],
                          "line": 357
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "var vit pendant la présence du composant, computed dérive toujours une valeur actuelle et persist retrouve automatiquement sa dernière valeur après un rechargement."
                          },
                          "children": [],
                          "line": 358
                        },
                        {
                          "type": "show",
                          "kind": "PersistentDemo",
                          "content": null,
                          "children": [],
                          "line": 359
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "preferences.intent"
                              },
                              "line": 360
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Preferences:\n  persist theme = \"light\"\n  persist compact = false\n\n  button \"Changer de thème\":\n    on click:\n      if theme == \"light\":\n        theme = \"dark\"\n      else:\n        theme = \"light\"\n\n  message \"Thème : {theme}\""
                              },
                              "line": 360
                            }
                          ],
                          "line": 360
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "cart.intent"
                              },
                              "line": 361
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Cart:\n  persist products = []\n  computed count = products.length\n\n  button \"Ajouter\":\n    on click:\n      products += featuredProduct\n\n  message \"{count} produit(s)\""
                              },
                              "line": 361
                            }
                          ],
                          "line": 361
                        }
                      ],
                      "line": 356
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Partage & actions"
                          },
                          "line": 363
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Partager l'état sans Provider, structurer sans reducer"
                          },
                          "children": [],
                          "line": 364
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "shared rend une valeur disponible partout. action donne un nom à une transition métier et do l'exécute, avec ou sans paramètre."
                          },
                          "children": [],
                          "line": 365
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "cart.intent"
                              },
                              "line": 366
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "shared cart = []\n\ncomponent AddButton:\n  input product = {}\n\n  action add(item):\n    cart += item\n    notify \"Ajouté au panier\"\n\n  button \"Ajouter\":\n    on click:\n      do add with product"
                              },
                              "line": 366
                            }
                          ],
                          "line": 366
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "header.intent"
                              },
                              "line": 367
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Header:\n  computed count = cart.length\n  message \"Panier : {count}\"\n\n  button \"Vider\":\n    on click:\n      reset cart"
                              },
                              "line": 367
                            }
                          ],
                          "line": 367
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "shared"
                                  },
                                  "line": 369
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "État global explicite"
                                  },
                                  "line": 369
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Déclaré une fois à la racine et réactif dans chaque composant."
                                  },
                                  "line": 369
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "shared cart = []"
                                  },
                                  "line": 369
                                }
                              ],
                              "line": 369
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "action"
                                  },
                                  "line": 370
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Transition nommée"
                                  },
                                  "line": 370
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Regroupe une suite d'affectations et de conditions."
                                  },
                                  "line": 370
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "action add(item):"
                                  },
                                  "line": 370
                                }
                              ],
                              "line": 370
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "do"
                                  },
                                  "line": 371
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Exécution"
                                  },
                                  "line": 371
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Appelle une action, éventuellement avec une valeur."
                                  },
                                  "line": 371
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "do add with product"
                                  },
                                  "line": 371
                                }
                              ],
                              "line": 371
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "reset"
                                  },
                                  "line": 372
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Valeur initiale"
                                  },
                                  "line": 372
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Restaure un var, persist ou shared à son état de départ."
                                  },
                                  "line": 372
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "reset cart"
                                  },
                                  "line": 372
                                }
                              ],
                              "line": 372
                            }
                          ],
                          "line": 368
                        }
                      ],
                      "line": 363
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Slots & identité"
                          },
                          "line": 374
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Composer librement et préserver le bon état"
                          },
                          "children": [],
                          "line": 375
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "slot place le contenu reçu. key identifie les éléments d'une liste et permet de conserver ou réinitialiser précisément leur état local."
                          },
                          "children": [],
                          "line": 376
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "panel.intent"
                              },
                              "line": 377
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Panel:\n  input title = \"Section\"\n\n  card:\n    heading title\n    slot\n\ncomponent App:\n  Panel(title: \"Profil\"):\n    message \"Contenu du parent\"\n    button \"Modifier\""
                              },
                              "line": 377
                            }
                          ],
                          "line": 377
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "tasks.intent"
                              },
                              "line": 378
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "each task in tasks where !task.done key task.id:\n  TaskRow(task: task, key: task.id)\n\n# Une nouvelle key recrée l'état local\nEditor(document: current, key: current.id)"
                              },
                              "line": 378
                            }
                          ],
                          "line": 378
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "slot"
                                  },
                                  "line": 380
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Contenu enfant"
                                  },
                                  "line": 380
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Affiche les enfants fournis par le parent à l'endroit choisi."
                                  },
                                  "line": 380
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "slot"
                                  },
                                  "line": 380
                                }
                              ],
                              "line": 380
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "where"
                                  },
                                  "line": 381
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Filtrage"
                                  },
                                  "line": 381
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Écarte les valeurs qui ne correspondent pas à l'expression."
                                  },
                                  "line": 381
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "where task.visible"
                                  },
                                  "line": 381
                                }
                              ],
                              "line": 381
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "key"
                                  },
                                  "line": 382
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Identité stable"
                                  },
                                  "line": 382
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Préserve l'état pendant un tri ou un déplacement."
                                  },
                                  "line": 382
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "key task.id"
                                  },
                                  "line": 382
                                }
                              ],
                              "line": 382
                            }
                          ],
                          "line": 379
                        }
                      ],
                      "line": 374
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Effets & références"
                          },
                          "line": 384
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Se synchroniser avec le navigateur, seulement quand c'est utile"
                          },
                          "children": [],
                          "line": 385
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "Les trois moments du cycle de vie sont nommés directement. ref donne un nom à un élément pour le focaliser, le faire défiler ou piloter un média."
                          },
                          "children": [],
                          "line": 386
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "search.intent"
                              },
                              "line": 387
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Search:\n  var query = \"\"\n  memory lastQuery = \"\"\n\n  on mount:\n    log \"Recherche prête\"\n\n  on change of query:\n    lastQuery = query\n\n  on unmount:\n    log \"Recherche fermée\"\n\n  input(ref: \"searchField\") \"Rechercher\":\n    bind query\n\n  button \"Écrire\":\n    on click:\n      focus searchField"
                              },
                              "line": 387
                            }
                          ],
                          "line": 387
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "navigation.intent"
                              },
                              "line": 388
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "section(ref: \"results\"):\n  heading \"Résultats\"\n\nbutton \"Voir\":\n  on click:\n    scroll to results\n\n# Pour un média : play video / pause video"
                              },
                              "line": 388
                            }
                          ],
                          "line": 388
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "on mount"
                                  },
                                  "line": 390
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Apparition"
                                  },
                                  "line": 390
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Lance une synchronisation après le premier rendu."
                                  },
                                  "line": 390
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "on mount:"
                                  },
                                  "line": 390
                                }
                              ],
                              "line": 390
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "on change of"
                                  },
                                  "line": 391
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Changement ciblé"
                                  },
                                  "line": 391
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Réagit au résultat d'une expression, sans tableau de dépendances."
                                  },
                                  "line": 391
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "on change of query:"
                                  },
                                  "line": 391
                                }
                              ],
                              "line": 391
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "memory"
                                  },
                                  "line": 392
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Valeur non réactive"
                                  },
                                  "line": 392
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Mémorise une information technique sans nouveau rendu."
                                  },
                                  "line": 392
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "memory timer = 0"
                                  },
                                  "line": 392
                                }
                              ],
                              "line": 392
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "ref"
                                  },
                                  "line": 393
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Accès à un élément"
                                  },
                                  "line": 393
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Nomme localement un élément ou un composant rendu."
                                  },
                                  "line": 393
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "ref: \"search\""
                                  },
                                  "line": 393
                                }
                              ],
                              "line": 393
                            }
                          ],
                          "line": 389
                        }
                      ],
                      "line": 384
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Données"
                          },
                          "line": 395
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Charger une API en une ligne"
                          },
                          "children": [],
                          "line": 396
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "load gère la requête, l'annulation, le résultat, le chargement et l'erreur. Une URL calculée est automatiquement rechargée lorsqu'elle change."
                          },
                          "children": [],
                          "line": 397
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "catalog.intent"
                              },
                              "line": 398
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Catalog:\n  load products from \"/api/products\"\n\n  if productsLoading:\n    message \"Chargement…\"\n  else:\n    if productsError != \"\":\n      message \"Erreur : {productsError}\"\n    else:\n      each product in products key product.id:\n        ProductCard(product: product, key: product.id)"
                              },
                              "line": 398
                            }
                          ],
                          "line": 398
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "dynamic.intent"
                              },
                              "line": 399
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component User:\n  input id = \"1\"\n  load profile from \"/api/users/{id}\"\n\n  if profile:\n    heading profile.name"
                              },
                              "line": 399
                            }
                          ],
                          "line": 399
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "data"
                                  },
                                  "line": 401
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Résultat"
                                  },
                                  "line": 401
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Le nom déclaré reçoit le JSON ou le texte de la réponse."
                                  },
                                  "line": 401
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "products"
                                  },
                                  "line": 401
                                }
                              ],
                              "line": 401
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "Loading"
                                  },
                                  "line": 402
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Chargement"
                                  },
                                  "line": 402
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Un booléen généré automatiquement pour afficher l'attente."
                                  },
                                  "line": 402
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "productsLoading"
                                  },
                                  "line": 402
                                }
                              ],
                              "line": 402
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "Error"
                                  },
                                  "line": 403
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Erreur"
                                  },
                                  "line": 403
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Un texte vide en succès ou le message reçu en cas d'échec."
                                  },
                                  "line": 403
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "productsError"
                                  },
                                  "line": 403
                                }
                              ],
                              "line": 403
                            }
                          ],
                          "line": 400
                        }
                      ],
                      "line": 395
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Conditions & listes"
                          },
                          "line": 405
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Décrire les variantes et les collections"
                          },
                          "children": [],
                          "line": 406
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "if et else choisissent ce qui apparaît. each répète une structure, peut la filtrer avec where et préserver son identité avec key."
                          },
                          "children": [],
                          "line": 407
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "status.intent"
                              },
                              "line": 408
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Status:\n  input connected = false\n\n  if connected:\n    message \"En ligne\"\n  else:\n    message \"Hors ligne\""
                              },
                              "line": 408
                            }
                          ],
                          "line": 408
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "tasks.intent"
                              },
                              "line": 409
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Tasks:\n  var tasks = [\"Écrire\", \"Tester\", \"Publier\"]\n\n  each task in tasks:\n    card:\n      heading task\n      message \"Position : {index}\"\n      button \"Terminer\":\n        on click:\n          tasks -= task"
                              },
                              "line": 409
                            }
                          ],
                          "line": 409
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "if"
                                  },
                                  "line": 411
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Condition"
                                  },
                                  "line": 411
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Affiche un bloc lorsque l'expression est vraie."
                                  },
                                  "line": 411
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "if total > 0:"
                                  },
                                  "line": 411
                                }
                              ],
                              "line": 411
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "else"
                                  },
                                  "line": 412
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Alternative"
                                  },
                                  "line": 412
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Suit directement un if au même niveau."
                                  },
                                  "line": 412
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "else:"
                                  },
                                  "line": 412
                                }
                              ],
                              "line": 412
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "each"
                                  },
                                  "line": 413
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Répétition"
                                  },
                                  "line": 413
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Parcourt une liste et expose la valeur ainsi que son index."
                                  },
                                  "line": 413
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "each task in tasks:"
                                  },
                                  "line": 413
                                }
                              ],
                              "line": 413
                            }
                          ],
                          "line": 410
                        }
                      ],
                      "line": 405
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Grilles"
                          },
                          "line": 415
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Placer les composants dans une grille responsive"
                          },
                          "children": [],
                          "line": 416
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "La grille annonce sa capacité. Les enfants expriment seulement la place souhaitée ; Intention réduit automatiquement les colonnes sur les petits écrans."
                          },
                          "children": [],
                          "line": 417
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "dashboard.intent"
                              },
                              "line": 418
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Dashboard:\n  grid(columns: 4, minimum: 220, gap: 16):\n    Header(width: 4)\n    Sidebar(width: 1, height: 2)\n    Sales(width: 2)\n    Activity(width: 1)\n    Orders(width: 3)"
                              },
                              "line": 418
                            }
                          ],
                          "line": 418
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "placement.intent"
                              },
                              "line": 419
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "grid(columns: 6, gap: 24, padding: 20):\n  Hero(width: 6)\n  Navigation(width: 2)\n  Main(width: 4)\n  Footer(width: 6)\n\n# column et row restent facultatifs"
                              },
                              "line": 419
                            }
                          ],
                          "line": 419
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "columns"
                                  },
                                  "line": 421
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Capacité"
                                  },
                                  "line": 421
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Nombre maximal de colonnes disponibles."
                                  },
                                  "line": 421
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "columns: 4"
                                  },
                                  "line": 421
                                }
                              ],
                              "line": 421
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "minimum"
                                  },
                                  "line": 422
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Responsive"
                                  },
                                  "line": 422
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Largeur minimale souhaitée avant repli automatique."
                                  },
                                  "line": 422
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "minimum: 220"
                                  },
                                  "line": 422
                                }
                              ],
                              "line": 422
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "width"
                                  },
                                  "line": 423
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Occupation"
                                  },
                                  "line": 423
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Nombre de colonnes souhaitées par un enfant."
                                  },
                                  "line": 423
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "Header(width: 4)"
                                  },
                                  "line": 423
                                }
                              ],
                              "line": 423
                            }
                          ],
                          "line": 420
                        }
                      ],
                      "line": 415
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Routing SSR"
                          },
                          "line": 425
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Des pages serveur avec une configuration de quelques lignes"
                          },
                          "children": [],
                          "line": 426
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "Une route statique, dynamique ou de secours pointe vers un composant du même nom. Les paramètres dynamiques deviennent directement ses inputs."
                          },
                          "children": [],
                          "line": 427
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "routes.intent"
                              },
                              "line": 428
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "routes:\n  Home: \"/\"\n  Documentation: \"/docs\"\n  Product: \"/products/:id\"\n  NotFound: \"*\"\n\ncomponent Product:\n  input id = \"\"\n  heading \"Produit {id}\"\n  button(href: \"/docs\") \"Retour\""
                              },
                              "line": 428
                            }
                          ],
                          "line": 428
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "navigation.intent"
                              },
                              "line": 429
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "component Navigation:\n  row:\n    button(href: \"/\") \"Accueil\"\n    button(href: \"/docs\") \"Documentation\"\n    button(href: \"/products/demo\") \"Produit démo\"\n\n# L'historique et les ancres sont automatiques"
                              },
                              "line": 429
                            }
                          ],
                          "line": 429
                        },
                        {
                          "type": "show",
                          "kind": "actions",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "button",
                              "content": {
                                "type": "literal",
                                "value": "Tester une route dynamique"
                              },
                              "children": [
                                {
                                  "type": "give",
                                  "name": "variant",
                                  "value": {
                                    "type": "literal",
                                    "value": "brand"
                                  },
                                  "line": 431
                                },
                                {
                                  "type": "give",
                                  "name": "appearance",
                                  "value": {
                                    "type": "literal",
                                    "value": "filled"
                                  },
                                  "line": 431
                                },
                                {
                                  "type": "give",
                                  "name": "href",
                                  "value": {
                                    "type": "literal",
                                    "value": "/examples/routing-demo"
                                  },
                                  "line": 431
                                },
                                {
                                  "type": "give",
                                  "name": "pill",
                                  "value": {
                                    "type": "literal",
                                    "value": true
                                  },
                                  "line": 431
                                }
                              ],
                              "line": 431
                            }
                          ],
                          "line": 430
                        }
                      ],
                      "line": 425
                    },
                    {
                      "type": "show",
                      "kind": "docsTab",
                      "content": null,
                      "children": [
                        {
                          "type": "give",
                          "name": "label",
                          "value": {
                            "type": "literal",
                            "value": "Web Components"
                          },
                          "line": 433
                        },
                        {
                          "type": "show",
                          "kind": "sectionTitle",
                          "content": {
                            "type": "literal",
                            "value": "Brancher n'importe quel design system"
                          },
                          "children": [],
                          "line": 434
                        },
                        {
                          "type": "show",
                          "kind": "sectionLead",
                          "content": {
                            "type": "literal",
                            "value": "Intention conserve le langage métier et délègue le rendu aux Custom Elements. Propriétés et événements peuvent être renommés dans un adaptateur minuscule."
                          },
                          "children": [],
                          "line": 435
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "design.js"
                              },
                              "line": 436
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "export default {\n  button: {\n    tag: \"acme-button\",\n    properties: { disabled: \"inactive\" },\n    events: { clicked: \"activate\" }\n  },\n  card: { tag: \"acme-card\" }\n};"
                              },
                              "line": 436
                            }
                          ],
                          "line": 436
                        },
                        {
                          "type": "show",
                          "kind": "codeWindow",
                          "content": null,
                          "children": [
                            {
                              "type": "give",
                              "name": "label",
                              "value": {
                                "type": "literal",
                                "value": "app.intent"
                              },
                              "line": 437
                            },
                            {
                              "type": "give",
                              "name": "code",
                              "value": {
                                "type": "literal",
                                "value": "design = \"./design.js\"\n\ncomponent App:\n  card:\n    heading \"Profil\"\n    button \"Enregistrer\":\n      disabled if name == \"\"\n      on click:\n        saved = true\n\n# Sans acme-button, fallback HTML natif"
                              },
                              "line": 437
                            }
                          ],
                          "line": 437
                        },
                        {
                          "type": "show",
                          "kind": "docsGrid",
                          "content": null,
                          "children": [
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "tag"
                                  },
                                  "line": 439
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Custom Element"
                                  },
                                  "line": 439
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Nom réel du Web Component utilisé pour un concept."
                                  },
                                  "line": 439
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "tag: \"acme-button\""
                                  },
                                  "line": 439
                                }
                              ],
                              "line": 439
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "properties"
                                  },
                                  "line": 440
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Propriétés"
                                  },
                                  "line": 440
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Traduit les propriétés Intention vers celles du composant."
                                  },
                                  "line": 440
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "disabled: \"inactive\""
                                  },
                                  "line": 440
                                }
                              ],
                              "line": 440
                            },
                            {
                              "type": "show",
                              "kind": "docItem",
                              "content": null,
                              "children": [
                                {
                                  "type": "give",
                                  "name": "keyword",
                                  "value": {
                                    "type": "literal",
                                    "value": "events"
                                  },
                                  "line": 441
                                },
                                {
                                  "type": "give",
                                  "name": "title",
                                  "value": {
                                    "type": "literal",
                                    "value": "Événements"
                                  },
                                  "line": 441
                                },
                                {
                                  "type": "give",
                                  "name": "description",
                                  "value": {
                                    "type": "literal",
                                    "value": "Traduit les événements émis par le composant de design."
                                  },
                                  "line": 441
                                },
                                {
                                  "type": "give",
                                  "name": "syntax",
                                  "value": {
                                    "type": "literal",
                                    "value": "clicked: \"activate\""
                                  },
                                  "line": 441
                                }
                              ],
                              "line": 441
                            }
                          ],
                          "line": 438
                        }
                      ],
                      "line": 433
                    }
                  ],
                  "line": 323
                }
              ],
              "line": 318
            }
          ],
          "line": 317
        }
      ],
      "line": 316
    },
    {
      "name": "Home",
      "body": [
        {
          "type": "show",
          "kind": "site",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "Navigation",
              "content": null,
              "children": [],
              "line": 445
            },
            {
              "type": "show",
              "kind": "Hero",
              "content": null,
              "children": [],
              "line": 446
            },
            {
              "type": "show",
              "kind": "metrics",
              "content": null,
              "children": [
                {
                  "type": "show",
                  "kind": "metric",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "value",
                      "value": {
                        "type": "literal",
                        "value": "0"
                      },
                      "line": 448
                    },
                    {
                      "type": "give",
                      "name": "label",
                      "value": {
                        "type": "literal",
                        "value": "balise HTML à écrire"
                      },
                      "line": 448
                    }
                  ],
                  "line": 448
                },
                {
                  "type": "show",
                  "kind": "metric",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "value",
                      "value": {
                        "type": "literal",
                        "value": "2"
                      },
                      "line": 449
                    },
                    {
                      "type": "give",
                      "name": "label",
                      "value": {
                        "type": "literal",
                        "value": "espaces par niveau"
                      },
                      "line": 449
                    }
                  ],
                  "line": 449
                },
                {
                  "type": "show",
                  "kind": "metric",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "value",
                      "value": {
                        "type": "literal",
                        "value": "100%"
                      },
                      "line": 450
                    },
                    {
                      "type": "give",
                      "name": "label",
                      "value": {
                        "type": "literal",
                        "value": "Web Components"
                      },
                      "line": 450
                    }
                  ],
                  "line": 450
                },
                {
                  "type": "show",
                  "kind": "metric",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "value",
                      "value": {
                        "type": "literal",
                        "value": "∞"
                      },
                      "line": 451
                    },
                    {
                      "type": "give",
                      "name": "label",
                      "value": {
                        "type": "literal",
                        "value": "possibilités"
                      },
                      "line": 451
                    }
                  ],
                  "line": 451
                }
              ],
              "line": 447
            },
            {
              "type": "show",
              "kind": "Features",
              "content": null,
              "children": [],
              "line": 452
            },
            {
              "type": "show",
              "kind": "Language",
              "content": null,
              "children": [],
              "line": 453
            },
            {
              "type": "show",
              "kind": "ReactivityShowcase",
              "content": null,
              "children": [],
              "line": 454
            },
            {
              "type": "show",
              "kind": "Process",
              "content": null,
              "children": [],
              "line": 455
            },
            {
              "type": "show",
              "kind": "Start",
              "content": null,
              "children": [],
              "line": 456
            },
            {
              "type": "show",
              "kind": "Footer",
              "content": null,
              "children": [],
              "line": 457
            }
          ],
          "line": 444
        }
      ],
      "line": 443
    },
    {
      "name": "Documentation",
      "body": [
        {
          "type": "show",
          "kind": "site",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "Navigation",
              "content": null,
              "children": [],
              "line": 461
            },
            {
              "type": "show",
              "kind": "GettingStarted",
              "content": null,
              "children": [],
              "line": 462
            },
            {
              "type": "show",
              "kind": "DocumentationManual",
              "content": null,
              "children": [],
              "line": 463
            },
            {
              "type": "show",
              "kind": "RoutingGuide",
              "content": null,
              "children": [],
              "line": 464
            },
            {
              "type": "show",
              "kind": "Communication",
              "content": null,
              "children": [],
              "line": 465
            },
            {
              "type": "show",
              "kind": "Components",
              "content": null,
              "children": [],
              "line": 466
            },
            {
              "type": "show",
              "kind": "FAQ",
              "content": null,
              "children": [],
              "line": 467
            },
            {
              "type": "show",
              "kind": "Start",
              "content": null,
              "children": [],
              "line": 468
            },
            {
              "type": "show",
              "kind": "Footer",
              "content": null,
              "children": [],
              "line": 469
            }
          ],
          "line": 460
        }
      ],
      "line": 459
    },
    {
      "name": "Reference",
      "body": [
        {
          "type": "show",
          "kind": "site",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "Navigation",
              "content": null,
              "children": [],
              "line": 473
            },
            {
              "type": "show",
              "kind": "LanguageReference",
              "content": null,
              "children": [],
              "line": 474
            },
            {
              "type": "show",
              "kind": "RoutingGuide",
              "content": null,
              "children": [],
              "line": 475
            },
            {
              "type": "show",
              "kind": "Footer",
              "content": null,
              "children": [],
              "line": 476
            }
          ],
          "line": 472
        }
      ],
      "line": 471
    },
    {
      "name": "Product",
      "body": [
        {
          "type": "input",
          "name": "id",
          "initial": {
            "type": "literal",
            "value": "example"
          },
          "line": 479
        },
        {
          "type": "show",
          "kind": "site",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "Navigation",
              "content": null,
              "children": [],
              "line": 482
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "tone",
                  "value": {
                    "type": "literal",
                    "value": "soft"
                  },
                  "line": 483
                },
                {
                  "type": "show",
                  "kind": "eyebrow",
                  "content": {
                    "type": "literal",
                    "value": "Route dynamique"
                  },
                  "children": [],
                  "line": 484
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "La page reçoit : {id}"
                  },
                  "children": [],
                  "line": 485
                },
                {
                  "type": "show",
                  "kind": "sectionLead",
                  "content": {
                    "type": "literal",
                    "value": "Le segment :id de l'URL a été injecté côté serveur puis transmis comme input au composant Product. Aucun routeur externe ni lecture manuelle de l'URL."
                  },
                  "children": [],
                  "line": 486
                },
                {
                  "type": "show",
                  "kind": "codeWindow",
                  "content": null,
                  "children": [
                    {
                      "type": "give",
                      "name": "label",
                      "value": {
                        "type": "literal",
                        "value": "product.intent"
                      },
                      "line": 487
                    },
                    {
                      "type": "give",
                      "name": "code",
                      "value": {
                        "type": "literal",
                        "value": "routes:\n  Product: \"/examples/:id\"\n\ncomponent Product:\n  input id = \"\"\n  heading \"Exemple {id}\""
                      },
                      "line": 487
                    }
                  ],
                  "line": 487
                },
                {
                  "type": "show",
                  "kind": "actions",
                  "content": null,
                  "children": [
                    {
                      "type": "show",
                      "kind": "button",
                      "content": {
                        "type": "literal",
                        "value": "Retour à la documentation"
                      },
                      "children": [
                        {
                          "type": "give",
                          "name": "variant",
                          "value": {
                            "type": "literal",
                            "value": "brand"
                          },
                          "line": 489
                        },
                        {
                          "type": "give",
                          "name": "appearance",
                          "value": {
                            "type": "literal",
                            "value": "filled"
                          },
                          "line": 489
                        },
                        {
                          "type": "give",
                          "name": "href",
                          "value": {
                            "type": "literal",
                            "value": "/docs#manual"
                          },
                          "line": 489
                        },
                        {
                          "type": "give",
                          "name": "pill",
                          "value": {
                            "type": "literal",
                            "value": true
                          },
                          "line": 489
                        }
                      ],
                      "line": 489
                    }
                  ],
                  "line": 488
                }
              ],
              "line": 483
            },
            {
              "type": "show",
              "kind": "Footer",
              "content": null,
              "children": [],
              "line": 490
            }
          ],
          "line": 481
        }
      ],
      "line": 478
    },
    {
      "name": "NotFound",
      "body": [
        {
          "type": "show",
          "kind": "site",
          "content": null,
          "children": [
            {
              "type": "show",
              "kind": "Navigation",
              "content": null,
              "children": [],
              "line": 494
            },
            {
              "type": "show",
              "kind": "sectionBlock",
              "content": null,
              "children": [
                {
                  "type": "give",
                  "name": "tone",
                  "value": {
                    "type": "literal",
                    "value": "soft"
                  },
                  "line": 495
                },
                {
                  "type": "show",
                  "kind": "eyebrow",
                  "content": {
                    "type": "literal",
                    "value": "Erreur 404"
                  },
                  "children": [],
                  "line": 496
                },
                {
                  "type": "show",
                  "kind": "sectionTitle",
                  "content": {
                    "type": "literal",
                    "value": "Cette page n'existe pas."
                  },
                  "children": [],
                  "line": 497
                },
                {
                  "type": "show",
                  "kind": "sectionLead",
                  "content": {
                    "type": "literal",
                    "value": "La route NotFound: \"*\" a rendu cette réponse côté serveur avec un vrai statut HTTP 404."
                  },
                  "children": [],
                  "line": 498
                },
                {
                  "type": "show",
                  "kind": "actions",
                  "content": null,
                  "children": [
                    {
                      "type": "show",
                      "kind": "button",
                      "content": {
                        "type": "literal",
                        "value": "Revenir à l'accueil"
                      },
                      "children": [
                        {
                          "type": "give",
                          "name": "variant",
                          "value": {
                            "type": "literal",
                            "value": "brand"
                          },
                          "line": 500
                        },
                        {
                          "type": "give",
                          "name": "appearance",
                          "value": {
                            "type": "literal",
                            "value": "filled"
                          },
                          "line": 500
                        },
                        {
                          "type": "give",
                          "name": "href",
                          "value": {
                            "type": "literal",
                            "value": "/"
                          },
                          "line": 500
                        },
                        {
                          "type": "give",
                          "name": "pill",
                          "value": {
                            "type": "literal",
                            "value": true
                          },
                          "line": 500
                        }
                      ],
                      "line": 500
                    },
                    {
                      "type": "show",
                      "kind": "button",
                      "content": {
                        "type": "literal",
                        "value": "Lire la documentation"
                      },
                      "children": [
                        {
                          "type": "give",
                          "name": "appearance",
                          "value": {
                            "type": "literal",
                            "value": "outlined"
                          },
                          "line": 501
                        },
                        {
                          "type": "give",
                          "name": "href",
                          "value": {
                            "type": "literal",
                            "value": "/docs"
                          },
                          "line": 501
                        },
                        {
                          "type": "give",
                          "name": "pill",
                          "value": {
                            "type": "literal",
                            "value": true
                          },
                          "line": 501
                        }
                      ],
                      "line": 501
                    }
                  ],
                  "line": 499
                }
              ],
              "line": 495
            },
            {
              "type": "show",
              "kind": "Footer",
              "content": null,
              "children": [],
              "line": 502
            }
          ],
          "line": 493
        }
      ],
      "line": 492
    }
  ],
  "basePath": "/Intention-site"
};
const design = Object.assign({}, program.designMap, design0);

startIntention(program, { design });
