<script setup>
const { onDragStart } = useDragAndDrop()
</script><template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          Here
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>