const holidayData = [
  {
    city: 'Dubai',
    suggestions: [
      {
        name: 'Burj Khalifa Observation Deck',
        images: [
          'https://www.guinnessworldrecords.com/Images/Burj-portrait-lagre_tcm25-475749.jpg',
        ],
      },
      {
        name: 'Desert Safari Adventure',
        images: [
          'https://image.khaleejtimes.com/?uuid=86c16da5-00bf-4e02-ae42-ee88cb7030f9&function=cropresize&type=preview&source=false&q=75&crop_w=0.99999&crop_h=0.9&x=0&y=0&width=1200&height=675',
        ],
      },
      {
        name: 'Dubai Mall Shoppings',
        images: [
          'https://media.cnn.com/api/v1/images/stellar/prod/180117120827-01-where-to-shop-in-dubai-photos.jpg?q=w_3000,h_1688,x_0,y_0,c_fill',
        ],
      },
    ],
  },
  {
      city: 'Manchester',
      suggestions: [
        {
          name: 'Manchester Museum',
          images: [
            'https://www.familyonthego.co.uk/wp-content/uploads/Manchester-Museum-Families.jpg',
          ],
        },
        {
          name: 'John Rylands Library',
          images: [
            'https://www.historyhit.com/app/uploads/fly-images/5155799/JohnRylandsLibrary-1-788x537.jpg?x37139',
          ],
        },
        {
          name: 'Science and Industry Museum',
          images: [
            'https://blog.scienceandindustrymuseum.org.uk/wp-content/uploads/2018/10/rocket-2.jpg',
          ],
        },
      ],
    },
    {
      city: 'Milton Keynes',
      suggestions: [
        {
          name: 'Bletchley Park',
          images: [
            'https://cdn.britannica.com/13/115413-050-280590D5/Bletchley-Park-Milton-Keynes-Eng.jpg',
          ],
        },
        {
          name: 'Xscape Milton Keynes',
          images: [
            'https://i0.wp.com/boomerangmediagroup.co.uk/wp-content/uploads/2017/07/Snozone-slope.jpg?fit=1000%2C630&ssl=1',
          ],
        },
        {
          name: 'Milton Keynes Museum',
          images: [
            'https://www.willmottdixon.co.uk/asset/12366',
          ],
        },
      ],
    },
    {
      city: 'Cambridge',
      suggestions: [
        {
          name: 'University of Cambridge',
          images: [
            'https://cdn.britannica.com/85/13085-050-C2E88389/Corpus-Christi-College-University-of-Cambridge-England.jpg',
          ],
        },
        {
          name: "King's College Chapel",
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/5/5b/Cambridge_-_King%27s_Chapel_-_stalles.jpg',
          ],
        },
        {
          name: 'Fitzwilliam Museum',
          images: [
            'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/ed/03/71/photo1jpg.jpg?w=1200&h=1200&s=1',
          ],
        },
        {
          name: 'Cambridge Central Mosque',
          images: [
            'https://www.cibsejournal.com/wp-content/uploads/2019/07/p24-Mosque-pic.jpg',
          ],
        },
      ],
    },
    {
      city: 'New York',
      suggestions: [
        {
          name: 'Statue of Liberty Tour',
          images: [
            'https://example.com/statue-of-liberty-image.jpg',
          ],
        },
        {
          name: 'Central Park Picnic',
          images: [
            'https://example.com/central-park-picnic-image.jpg',
          ],
        },
        {
          name: 'Broadway Show',
          images: [
            'https://example.com/broadway-show-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Paris',
      suggestions: [
        {
          name: 'Eiffel Tower',
          images: [
            'https://example.com/eiffel-tower-image.jpg',
          ],
        },
        {
          name: 'Louvre Museum',
          images: [
            'https://example.com/louvre-museum-image.jpg',
          ],
        },
        {
          name: 'Notre-Dame Cathedral',
          images: [
            'https://example.com/notre-dame-cathedral-image.jpg',
          ],
        },
        {
          name: 'Montmartre and Sacré-Cœur Basilica',
          images: [
            'https://example.com/montmartre-sacre-coeur-image.jpg',
          ],
        },
        {
          name: 'Seine River Cruise',
          images: [
            'https://example.com/seine-river-cruise-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Tokyo',
      suggestions: [
        {
          name: 'Tokyo Disneyland',
          images: [
            'https://example.com/tokyo-disneyland-image.jpg',
          ],
        },
        {
          name: 'Senso-ji Temple',
          images: [
            'https://example.com/senso-ji-temple-image.jpg',
          ],
        },
        {
          name: 'Shibuya Crossing',
          images: [
            'https://example.com/shibuya-crossing-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'London',
      suggestions: [
        {
          name: 'British Museum',
          images: [
            'https://example.com/british-museum-image.jpg',
          ],
        },
        {
          name: 'Tower of London',
          images: [
            'https://example.com/tower-of-london-image.jpg',
          ],
        },
        {
          name: 'Buckingham Palace',
          images: [
            'https://example.com/buckingham-palace-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Sydney',
      suggestions: [
        {
          name: 'Sydney Opera House',
          images: [
            'https://example.com/sydney-opera-house-image.jpg',
          ],
        },
        {
          name: 'Bondi Beach',
          images: [
            'https://example.com/bondi-beach-image.jpg',
          ],
        },
        {
          name: 'Sydney Harbour Bridge Climb',
          images: [
            'https://example.com/sydney-harbour-bridge-climb-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Rome',
      suggestions: [
        {
          name: 'Trevi Fountain',
          images: [
            'https://example.com/trevi-fountain-image.jpg',
          ],
        },
        {
          name: 'Pantheon',
          images: [
            'https://example.com/pantheon-image.jpg',
          ],
        },
        {
          name: 'Spanish Steps',
          images: [
            'https://example.com/spanish-steps-image.jpg',
          ],
        },
        {
          name: 'Villa Borghese Gardens',
          images: [
            'https://example.com/villa-borghese-gardens-image.jpg',
          ],
        },
        {
          name: "Castel Sant'Angelo",
          images: [
            'https://example.com/castel-sant-angelo-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Seoul',
      suggestions: [
        {
          name: 'Gyeongbokgung Palace',
          images: [
            'https://example.com/gyeongbokgung-palace-image.jpg',
          ],
        },
        {
          name: 'Myeongdong Shopping Street',
          images: [
            'https://example.com/myeongdong-shopping-image.jpg',
          ],
        },
        {
          name: 'Bukchon Hanok Village',
          images: [
            'https://example.com/bukchon-hanok-image.jpg',
          ],
        },
        {
          name: 'Namsan Seoul Tower',
          images: [
            'https://example.com/namsan-tower-image.jpg',
          ],
        },
        {
          name: 'Lotte World Theme Park',
          images: [
            'https://example.com/lotte-world-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Dhaka',
      suggestions: [
        {
          name: 'Ahsan Manzil',
          images: [
            'https://example.com/ahsan-manzil-image.jpg',
          ],
        },
        {
          name: 'Lalbagh Fort',
          images: [
            'https://example.com/lalbagh-fort-image.jpg',
          ],
        },
        {
          name: 'Dhakeshwari Temple',
          images: [
            'https://example.com/dhakeshwari-temple-image.jpg',
          ],
        },
        {
          name: 'Sundarbans Mangrove Forest',
          images: [
            'https://example.com/sundarbans-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Sylhet',
      suggestions: [
        {
          name: 'Ratnodweep Resort',
          images: [
            'https://example.com/ratnodweep-resort-image.jpg',
          ],
        },
        {
          name: 'Jaflong',
          images: [
            'https://example.com/jaflong-image.jpg',
          ],
        },
        {
          name: 'Lalakhal River',
          images: [
            'https://example.com/lalakhal-river-image.jpg',
          ],
        },
        {
          name: 'Srimangal Tea Gardens',
          images: [
            'https://example.com/srimangal-tea-gardens-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Mumbai',
      suggestions: [
        {
          name: 'Gateway of India',
          images: [
            'https://example.com/gateway-of-india-image.jpg',
          ],
        },
        {
          name: 'Marine Drive',
          images: [
            'https://example.com/marine-drive-image.jpg',
          ],
        },
        {
          name: 'Elephanta Caves',
          images: [
            'https://example.com/elephanta-caves-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Delhi',
      suggestions: [
        {
          name: 'India Gate',
          images: [
            'https://example.com/india-gate-image.jpg',
          ],
        },
        {
          name: 'Qutub Minar',
          images: [
            'https://example.com/qutub-minar-image.jpg',
          ],
        },
        {
          name: 'Lotus Temple',
          images: [
            'https://example.com/lotus-temple-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Agra',
      suggestions: [
        {
          name: 'Taj Mahal',
          images: [
            'https://example.com/taj-mahal-image.jpg',
          ],
        },
        {
          name: 'Agra Fort',
          images: [
            'https://example.com/agra-fort-image.jpg',
          ],
        },
        {
          name: 'Fatehpur Sikri',
          images: [
            'https://example.com/fatehpur-sikri-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Lisbon',
      suggestions: [
        {
          name: 'Belém Tower',
          images: [
            'https://example.com/belem-tower-image.jpg',
          ],
        },
        {
          name: 'Jerónimos Monastery',
          images: [
            'https://example.com/jeronimos-monastery-image.jpg',
          ],
        },
        {
          name: 'Alfama District',
          images: [
            'https://example.com/alfama-district-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Mexico City',
      suggestions: [
        {
          name: 'Chapultepec Castle',
          images: [
            'https://example.com/chapultepec-castle-image.jpg',
          ],
        },
        {
          name: 'Zócalo',
          images: [
            'https://example.com/zocalo-image.jpg',
          ],
        },
        {
          name: 'Frida Kahlo Museum',
          images: [
            'https://example.com/frida-kahlo-museum-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Reykjavik',
      suggestions: [
        {
          name: 'Hallgrímskirkja',
          images: [
            'https://example.com/hallgrimskirkja-image.jpg',
          ],
        },
        {
          name: 'Blue Lagoon',
          images: [
            'https://example.com/blue-lagoon-image.jpg',
          ],
        },
        {
          name: 'Golden Circle',
          images: [
            'https://example.com/golden-circle-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Akureyri',
      suggestions: [
        {
          name: 'Akureyrarkirkja',
          images: [
            'https://example.com/akureyrarkirkja-image.jpg',
          ],
        },
        {
          name: 'Myvatn Nature Baths',
          images: [
            'https://example.com/myvatn-nature-baths-image.jpg',
          ],
        },
        {
          name: 'Húsavík',
          images: [
            'https://example.com/husavik-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Vatnajökull National Park',
      suggestions: [
        {
          name: 'Svartifoss Waterfall',
          images: [
            'https://example.com/svartifoss-image.jpg',
          ],
        },
        {
          name: 'Jökulsárlón Glacier Lagoon',
          images: [
            'https://example.com/jokulsarlon-image.jpg',
          ],
        },
        {
          name: 'Skaftafell Nature Reserve',
          images: [
            'https://example.com/skaftafell-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Oslo',
      suggestions: [
        {
          name: 'Vigeland Park',
          images: [
            'https://example.com/vigeland-park-image.jpg',
          ],
        },
        {
          name: 'Akershus Fortress',
          images: [
            'https://example.com/akershus-fortress-image.jpg',
          ],
        },
        {
          name: 'The Royal Palace',
          images: [
            'https://example.com/royal-palace-image.jpg',
          ],
        },
      ],
    },
    
    {
      city: 'Bergen',
      suggestions: [
        {
          name: 'Bryggen Wharf',
          images: [
            'https://example.com/bryggen-wharf-image.jpg',
          ],
        },
        {
          name: 'Fløyen Mountain',
          images: [
            'https://example.com/floyen-mountain-image.jpg',
          ],
        },
        {
          name: 'Fish Market',
          images: [
            'https://example.com/fish-market-image.jpg',
          ],
        },
      ],
    },
    {
      city: 'Trondheim',
      suggestions: [
        {
          name: 'Nidaros Cathedral',
          images: [
            'https://example.com/nidaros-cathedral-image.jpg',
          ],
        },
        {
          name: 'Gamle Bybro (Old Town Bridge)',
          images: [
            'https://example.com/gamle-bybro-image.jpg',
          ],
        },
        {
          name: 'Rockheim - The National Museum of Popular Music',
          images: [
            'https://example.com/rockheim-image.jpg',
          ],
        },
      ],
    },
    {
      "city": "Buenos Aires",
      "suggestions": [
        {
          "name": "La Boca Neighborhood",
          "images": [
            "https://example.com/la-boca-image.jpg"
          ]
        },
        {
          "name": "Teatro Colón",
          "images": [
            "https://example.com/teatro-colon-image.jpg"
          ]
        },
        {
          "name": "Recoleta Cemetery",
          "images": [
            "https://example.com/recoleta-cemetery-image.jpg"
          ]
        }
      ]
    }
    
      
];

export default holidayData;
