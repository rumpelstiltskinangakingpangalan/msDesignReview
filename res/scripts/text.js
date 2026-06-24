
let books = [];

function localData(book_title, kid_name) {

  books[0] = {
    title: "The Princess Within",
    type: "Regular",
    text_position: "L, R, L, L, R, R, R, L, L, R, R, L, L, R, R, R, R, L, L, L, R, R",
    page_type: "A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A",
    fonts: `<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Reddit+Sans&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Sorcery&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Varelaround&display=swap" rel="stylesheet">`,
    pages: {
        coverBack: `<img src="https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/books/the_princess_within/cover.png" fetchpriority="high">
                    <div style="width: 110%; height: auto; position: absolute; scale: 62%; top: 40%; left: -3%;">
                      <p style="text-align: center; font-family: 'Lato'; font-weight: 700; color: rgb(255, 255, 255); font-size:22px; line-height: 1.5em;">When ${kid_name} discovers a magical hall of gowns, each one teaches her a different kind of strength she already carries deep within her heart.</p>
                    </div>`,

        coverFront: `
                  <img src="https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/sample_images/1e461b89-f9f3-45a4-b36f-479ed823336d/0.png" fetchpriority="high">
                  <img src="https://res.cloudinary.com/do8rs856w/image/upload/dpr_3,q_100/v1/magic-story/f40nk0au4l1bmtjxjosm?_a=BAMHUyWQ0" fetchpriority="high">
                  <img src="https://res.cloudinary.com/do8rs856w/image/upload/v1743197222/CoverTab_-_Bottom_-_3-28_ce9ek5.svg" fetchpriority="high">
                  
                  <div style="position: absolute; width: auto; height: auto; justify-self: center; top: 81%; scale: 70%;">
                    <p style="font-family: 'Lato', sans-serif; font-weight: 700; font-size: 30.186261928934012px; text-transform: uppercase; letter-spacing: 0.2em; text-align: center; color: #ffffff; text-shadow: 2px 2px 4px rgba(0,0,0,0.50);">Starring ${kid_name}</p>
                  </div>
                  `,
        page1: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">The morning was quiet, the house was still,</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">as the sun started peeking over the hill.</span></p>
                  <p><br></p>
                  <p><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">${kid_name} lay waiting,</em></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">warm in her bed, while a </span><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh;">flutter of wonder</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">filled up her head.</span></p>
                </div>`,
        page2: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">${kid_name} slipped from her blankets</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">and tip-toed across the floor,</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">to a wall where she noticed a</span></p>
                  <p style="text-align: center;"><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">strange, secret door</em><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 700; color: rgb(255, 168, 223);">.</span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">She pushed on the handle, and gasped at the sight: a <br> hall of princess gowns in</span></p>
                  <p style="text-align: center;"><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">shimmering light!</em></p>
                </div>`,
        page3: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">The hallway was long, and the hallway was tall,</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">with gowns for ${kid_name} down every wall.</span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">They </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">whispered and rustled</em><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 700; color: rgb(255, 168, 223);">,</span></p>
                  <p style="text-align: center;"><span style="line-height: 1.6; font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">they </span><em style="line-height: 1.6; font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">sparkled and gleamed</em><span style="line-height: 1.6; font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 700; color: rgb(255, 168, 223);">,</span></p>
                  <p style="text-align: center;"><span style="line-height: 1.6; font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">and each one looked lovelier</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">than she ever had dreamed.</span></p>
                </div>`,
        page4: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">${kid_name} reached for a gown of r</span><span style="font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">uby</span><span style="font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255); font-family: 'EB Garamond';"> so bright,</span></p>
                  <p><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">a fabric of courage</em></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">for facing a fright.</span></p>
                  <p><br></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">It warmed in her hands</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">and it steadied her chest. </span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">${kid_name} stood taller, her fear laid to rest.</span></p>
                </div>`,
        page5: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">She tried on a dress of soft m</span><span style="font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">eadow green,</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">the gentlest k</span><span style="font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">indness</span><span style="font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255); font-family: 'EB Garamond';"> that ever was seen.</span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">It made her heart softer,</em></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">her smile more sweet,</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">so ${kid_name} could welcome</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">each friend she'd meet.</span></p>
                </div>`,
        page6: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">A gown of </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">pink petals,</em><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 2.5cqh; font-family: 'Playfair Display';"> </em><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">soft as a dream,</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">with </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">patience</em><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';"> </span><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">sewn in, every stitch, every seam.</span></p>
                  <p><br></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">It taught her to breathe</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">when her worries would stir,</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">to wait for the moment,</span></p>
                  <p><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">and know it was hers.</em></p>
                </div>`,
        page7: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">A dress of </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">golden sunlight,</em></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">radiant and tall,</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">pure </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">joy</em><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);"> for ${kid_name}</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">when shadows might fall.</span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">It wrapped her in laughter, a glow from within,</span></p>
                  <p style="text-align: center;"><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">a light she could carry</em></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">again and again.</span></p>
                </div>`,
        page8: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">Next came a gown of </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">velvet blue</em><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);"> hue,</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">soft </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">peace</em><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);"> for ${kid_name}</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">when worries feel new.</span></p>
                  <p><br></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">It settled the flutter, it quieted fear,</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">a hush like a lullaby close to her ear.</span></p>
                </div>`,
        page9: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">A gown of bright </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">starlight</em></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">was stitched with such care,</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">pure </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">wonder</em><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);"> for ${kid_name} was woven in there.</span></p>
                  <p><br></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">It opened her eyes to the world that's so wide,</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">and the beautiful things that are waiting inside.</span></p>
                </div>`,
        page10: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">Then rose gold and flame,</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">a dress made to please,</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">the color of </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">confidence</em><span style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">,</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">sure as the breeze.</span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">It straightened her shoulders</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">and steadied her stance,</span></p>
                  <p style="text-align: center;"><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">to trust her own heart</em></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">when given the chance.</span></p>
                </div>`,
        page11: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">A </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">rainbow of silk</em></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">was the last to appear,</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">pure </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">creativity,</em><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';"> shimmering clear.</span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">It whispered to ${kid_name}</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">that problems have more than one key,</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">every puzzle has answers</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">that only she would see.</span></p>
                </div>`,
        page12: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">${kid_name} stepped in front of the mirror to see,</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">the girl in the gowns she was trying to be.</span></p>
                  <p><br></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">But the mirror showed only the</span></p>
                  <p><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">girl from the start.</em></p>
                  <p><br></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">No ruby, no velvet, just her</span></p>
                  <p><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">own quiet heart</em><span style="color: rgb(255, 168, 223); font-weight: 700; font-size: 2.5cqh; font-family: 'EB Garamond';">.</span></p>
                </div>`,
        page13: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">She blinked, and she wondered,</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">and then she just knew: the dresses were </span><span style="font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">magic</span><span style="font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255); font-family: 'EB Garamond';">, </span><em style="font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223); font-family: 'Playfair Display';">but ${kid_name} was too.</em></p>
                  <p><br></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 44px; font-weight: 400; color: rgb(255, 255, 255);">The courage, the kindness, the wonder, the peace,</span></p>
                  <p><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">all tucked in her heart,</em></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">and never would cease.</span></p>
                </div>`,
        page14: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">The hallway grew quiet, the gowns softly sighed, returning to order on each silver side.</span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 43px; font-family: 'EB Garamond';">${kid_name} </span><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 43px;">smiled warmly</span><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 43px; font-family: 'EB Garamond';"> and crawled through the door, </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">more ready for life</em></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">than she'd been before.</span></p>
                </div>`,
        page15: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">${kid_name} touched the door softly</span></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">and watched it fade slow,</span></p>
                  <p style="text-align: center;"><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">the secret door's magic</em></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">now only she'd know.</span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 44px; font-weight: 400; color: rgb(255, 255, 255);">But the magic had taken its place in her heart,</span></p>
                  <p style="text-align: center;"><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">a treasure of strength</em></p>
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">from which she would not part.</span></p>
                </div>`,
        page16: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">She skipped down the stairs</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">with a hum and a tune,</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">as the light of the sun</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">warmed up the room.</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">With a step that was </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">steady</em></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">and eyes open wide,</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">${kid_name} was beaming with</span></p>
                  <p><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">princess-sized pride</em><span style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'EB Garamond';">.</span></p>
                </div>`,
        page17: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">Out into the morning,</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">she stepped from the door,</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">the day stretching out</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">like a song to explore.</span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">Any flutter of worry had slipped clean away,</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">for ${kid_name} had </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">all the magic</em></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">to </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">carry the day</em><span style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'EB Garamond';">.</span></p>
                </div>`,
        page18: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">And whenever a moment felt </span><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh;">lonely or dark</span><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">,</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">when fear knocked on her heart</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">and hope lost its spark.</span></p>
                  <p><br></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">She'd close her eyes gently,</span></p>
                  <p><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">breathe slow</em><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';"> and </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">breathe deep,</em></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">and the right color whispered</span></p>
                  <p><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">right up from its sleep.</span></p>
                </div>`,
        page19: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">A whisper of </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">ruby</em></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">when courage was right.</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">A hush of </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">pink petal</em></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">to settle her fright.</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">A shimmer of </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">gold</em></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">when ${kid_name}'s day felt too gray.</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">A ribbon of </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">rainbow</em></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">to brighten her way.</span></p>
                </div>`,
        page20: `<div class = "textWrapper" style = "position: absolute;">
                  <p><span style="font-family: 'EB Garamond'; font-size: 44px; font-weight: 400; color: rgb(255, 255, 255);">For the gowns hadn't vanished, not truly, not quite,</span><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);"> they lived in her heart like a</span></p>
                  <p><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">soft, guiding light</em><span style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">.</span></p>
                  <p><br></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">Each color of </span><span style="font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">kindness and strength</span></p>
                  <p><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">she could see, was part of</span></p>
                  <p><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">the princess ${kid_name} could be.</em></p>
                </div>`,
        page21: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">That night as she nestled in blankets so deep,</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">the moon through the window was gentle with sleep. </span></p>
                  <p style="text-align: center;"><br></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">${kid_name} smiled at the ceiling,</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">her heart </span><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">full and bright</em><span style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">,</span></p>
                  <p style="text-align: center;"><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh; font-family: 'EB Garamond';">a girl whose </span><span style="color: rgb(255, 255, 255); font-weight: 400; font-size: 2.5cqh;">own magic</span></p>
                  <p style="text-align: center;"><em style="color: rgb(255, 168, 223); font-weight: 700; font-size: 4cqh; font-family: 'Playfair Display';">would light up the night.</em></p>
                </div>`,
        page22: `<div class = "textWrapper" style = "position: absolute;">
                  <p style="text-align: center;"><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">For though she had visited kingdoms of thread, and tried on the dresses that shimmered and spread, </span><span style="font-family: 'EB Garamond'; font-size: 42px; font-weight: 400; color: rgb(255, 255, 255);">the lesson she learned is</span><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);"> </span><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">simple and true</em><span style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">: </span><span style="font-family: 'EB Garamond'; font-size: 2.5cqh; font-weight: 400; color: rgb(255, 255, 255);">the magic was never the gown,</span></p>
                  <p style="text-align: center;"><em style="font-family: 'Playfair Display'; font-size: 4cqh; font-weight: 700; color: rgb(255, 168, 223);">${kid_name}, it's YOU.</em></p>
                </div>`,
    },
    references: {
      coverFront: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/0.png`,
      page1: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/1.png`,
      page2: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/2.png`,
      page3: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/3.png`,
      page4: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/4.png`,
      page5: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/5.png`,
      page6: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/6.png`,
      page7: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/7.png`,
      page8: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/8.png`,
      page9: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/9.png`,
      page10: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/10.png`,
      page11: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/11.png`,
      page12: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/12.png`,
      page13: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/13.png`,
      page14: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/14.png`,
      page15: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/15.png`,
      page16: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/16.png`,
      page17: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/17.png`,
      page18: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/18.png`,
      page19: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/19.png`,
      page20: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/20.png`,
      page21: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/21.png`,
      page22: `https://cqnqfvusotfvynhabueh.supabase.co/storage/v1/object/public/template_images/the_princess_within/22.png`,
    }
}

  let i = books.findIndex(b => b.title === book_title);

  return books[i];
}