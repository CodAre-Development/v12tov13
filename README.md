   <div align="center">

<img height="200" src="https://discord.js.org/android-chrome-192x192.png" alt="Djs logosu"/>

# V12toV13

**CodAre'ın resmi sitesi için yapılmış v12tov13 sistemi (BETA)**

 # Kurulum
 Projeyi klonladıktan sonra proje klasörünün içine girin ve klasörde bir terminal açın. Terminalinize ```npm i``` yazmanız yeterli olacaktır.
 
 # Kullanım 
  ```
  v12 kodunuzda bulunan metodların argümanlarının her birini "Ð" işaretleri arasına koymalısınız böylece 
  program metodunuzda bulunan argümanları ayırt edebilsin. Eğer argüman sisteminin nasıl çalıştığını hala
  anlamadıysanız testScript.txt içinde halihazırda yazılı olan koda bakarak argüman
  sisteminin çalışma prensibini anlayabilirsiniz.

  Kurulum aşamasından sonra çalıştırmak için src klasöründeki FileReader.js dosyasını başlatmanız yeterlidir.
  ```
</div>

 # Geliştiriciler İçin
  ```js
  Eğer çevirici programının kodlarını değiştirmek istiyorsanız bilmeniz gerekenler şunlardır

  1)-Sp ve Bd- kullanıcının v12 kodunda belirttiği argümanı alıp v13te bulunan 
  yerine koymaya yarar örnek olarak
  .setAuthor(Ð"birinci argüman"Ð, Ð"ikinci argüman"Ð) //v12 kodumuz

  //Program otomatik olarak argümanları sıraya dizer ve yerleştirir sonuç altta belirtilmiştir

  .setAuthor({ name: "birinci argüman",iconURL: "ikinci argüman"})

  //Bu çıktıyı oluşturmak için kullanılan obje aşağıda belirtilmiştir

{
  name: '.setAuthor',
  usage: '.setAuthor(argument, argument, argument)',
  replace: '.setAuthor({ 1*name: -SpargumentBd-*1 2*iconURL: -SpargumentBd-*2 3*url: -SpargumentBd-*3 })',
  maxArgsCount: 3, //burası metodun alabileceği maksimum argüman sayısını belirtir bu değer verilmediği sürece çıktı bozuk çıkacaktır
  newName: '.setAuthor'
}

  2)Processes arrayinde bulunan bazı objelerde bulunan replace özelliğinde bulunan 
  <Sayi>* ve *<Sayi> ne anlama gelmektedir?

  1* ve *1 gibi yerlerin kullanılma sebebi eğer 1. argüman girilmezse 1* ve *1 
  arasındaki kısım otomatik olarak silinecektir anlamına gelmektedir aynı şekilde 
  bu 2. ve 3. argümanlar için de geçerlidir. Ek olarak program otomatik olarak argümanların
  arasına virgül ekleme işlemini de bu sayı ve yıldız işaretlerini kullanarak yapar örnek 
  olarak 1. argümandan sonra 2. argüman gelir bu yüzden 1. argüman işaretinin sonu "*1" ile 
  biter ve 2. argüman işaretinin başlangıcı "2*" ile başlar program otomatik olarak *1 ve 2* 
  arasına virgül yerleştirir böylece herhangi bir argüman girilmese bile program hatasız sonuç verebilmektedir

  3)maxArgsCount her argüman içerebilen metodların objelerine eklenmesi zorunlu bir özelliktir

  4)justReplace nedir?

  Eğer bir metodun kullanım şekli aynı kalmış sadece metodun adı değiştirilmiş ise
  justReplace özelliği kullanılabilir. justReplace özelliği eklendiğinde argüman
  sistemi kullanılmaz bu yüzden obje justReplace içeriyorsa o objenin replace 
  özelliğine argüman sistemine dair herhangi bir şey girilmesi gereksizdir.

  Not: justReplace özelliği sadece metodlarda değil işlem yapılan satırda herhangi 
  bir şeyi değiştirmek için de kullanılabilmektedir.

  5)useEqualOperatorHandler nedir?

  Bu özellik Discord.js v13te değiştirilmiş bir özelliğin diğer bir özelliğe eşit olması
  gerekiyorsa kullanılan bir özelliktir

        Örnek olarak
        
        if(message.channel.type == "text") {} //Giriş olan DJS v12 kodu
                      |
                      |
                      |
                      |
                      |
                      V

                  //Kullanılan çevirici obje                   
                  {
                    name: "text",
                    usage: "text",
                    replace: "GUILD_TEXT",
                    newName: "GUILD_TEXT",
                    useEqualOperatorHandler: {
                        what: ".type"
                      }
                  }

                      |
                      |
                      |
                      |
                      |
                      V

      if(message.channel.type == "GUILD_TEXT") {} //Çıktı olan DJS v13 kodu
  ``` 

# Contributorlar:
* [iamashley0](https://github.com/iamashley0) -
  **Ashley**
* [xrenata](https://github.com/xrenata) -
  **Emirhan**
* [SpongeBed81](https://github.com/SpongeBed81) -
  **Uras**

