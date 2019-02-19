import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Accordion, { AccordionItem } from '..'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Missing #root')
}

ReactDOM.render(
  <div className="App">
    <h1>Accordion Example</h1>

    <Accordion classPrefix="MyAccordion" idPrefix="my_accordion_">
      <AccordionItem
        title={<h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>}
      >
        <p>
          Nunc et porta nibh. Interdum et malesuada fames ac ante ipsum primis
          in faucibus. Ut dapibus purus accumsan leo blandit fringilla. Maecenas
          id aliquet nibh. Donec sodales sapien eget lacinia tincidunt.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas.
        </p>
        <p>
          Quisque non elementum diam. Nam pellentesque ipsum at consequat
          lacinia. Duis hendrerit est quis purus pharetra ultrices. Nulla
          tristique ex mauris, quis venenatis nisl iaculis non. Phasellus
          dignissim ex sit amet rutrum cursus. Curabitur interdum semper
          sagittis. Suspendisse porta, enim sit amet ultrices molestie, libero
          ipsum sollicitudin sem, non egestas eros quam vitae augue. Etiam
          tellus risus, porttitor sed erat at, sodales vehicula urna.
        </p>
      </AccordionItem>

      <AccordionItem
        title={
          <h3>Cras rhoncus metus lobortis, iaculis enim ac, viverra libero</h3>
        }
      >
        <p>
          Aliquam molestie lectus id sem mattis rutrum. Nullam eu magna
          placerat, fringilla turpis a, consectetur justo. Aenean a vestibulum
          libero. Nam bibendum mattis purus quis semper. Nam elementum sem ac
          rhoncus pharetra. Phasellus ut suscipit est. Aenean a lacus a orci
          lobortis luctus. Pellentesque placerat mi in iaculis maximus. Aenean
          pharetra libero vitae neque congue imperdiet. Sed auctor erat vel
          lectus euismod mollis.
        </p>
      </AccordionItem>

      <AccordionItem title={<h3>Sed ac aliquet lorem.</h3>}>
        <p>
          In consequat turpis ac congue porta. Sed nisi ante, imperdiet vel
          libero et, placerat ultrices nulla. Nullam sit amet pharetra justo.
          Suspendisse hendrerit fringilla orci, dignissim posuere urna
          scelerisque ac. Aliquam at massa id augue maximus sodales. Ut
          suscipit, est ac facilisis posuere, neque tortor iaculis mi, sit amet
          tempus turpis nibh vel elit. Aenean egestas augue id leo pretium, a
          pretium lorem ultrices. Maecenas finibus, leo eu luctus vestibulum,
          enim turpis varius ex, sit amet scelerisque turpis risus nec ipsum.
        </p>
      </AccordionItem>
      <AccordionItem title={<h3>Etiam quis arcu a odio congue vehicula.</h3>}>
        <p>
          Phasellus mattis tortor eu nulla pretium, a rutrum enim aliquam. In
          non lectus dapibus, dapibus nunc sed, faucibus felis. Nulla fermentum
          massa sed leo luctus, in imperdiet odio aliquet. Maecenas dignissim
          nisl dolor, non auctor elit venenatis sed. Donec pharetra accumsan
          lorem. Pellentesque id egestas quam.
        </p>
      </AccordionItem>

      <AccordionItem
        title={<h3>Ut at erat maximus, accumsan lacus ac, laoreet nulla.</h3>}
      >
        <p>
          Proin ut ultricies lacus. Suspendisse imperdiet, nibh a sodales
          gravida, nulla ipsum aliquet leo, a posuere dolor diam sit amet odio.
          Nullam non erat eros. Sed mattis arcu in nisl suscipit, non tincidunt
          augue commodo. Nam convallis nec erat eu cursus. Maecenas pellentesque
          vulputate sapien, nec fringilla justo. In dapibus magna tristique
          pretium efficitur. Ut eget dignissim arcu. Donec eget dui volutpat,
          feugiat libero eget, elementum tortor. Mauris ut viverra dolor. Proin
          aliquam lorem ut augue gravida, rutrum imperdiet erat consectetur. In
          in neque tristique ligula vulputate posuere. Nullam augue odio,
          vehicula vitae sapien quis, maximus lobortis tellus. Aliquam aliquam
          ex quis justo euismod tincidunt. Aenean et nulla sodales, viverra
          ligula quis, sollicitudin purus.
        </p>
      </AccordionItem>
    </Accordion>
  </div>,
  root
)
