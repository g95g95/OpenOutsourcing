import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, AlertTriangle, Sparkles, Heart, Cpu, ChevronDown, ChevronUp } from 'lucide-react'

// Icon mapping
const iconMap = {
  GraduationCap,
  AlertTriangle,
  Sparkles,
  Heart,
  Cpu
}

/**
 * Card component that responds to gestures
 * Expands/contracts based on pinch gesture, highlights on hover
 */
function GestureCard({
  section,
  isSelected,
  isExpanded,
  onToggleExpand,
  palmPosition,
  gestureMode
}) {
  const Icon = iconMap[section.icon] || Sparkles

  // Particle dissolve/recompose animation variants
  const cardVariants = {
    collapsed: {
      height: 'auto',
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    dissolving: {
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  }

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.4, delay: 0.1 }
    }
  }

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="collapsed"
      animate={isExpanded ? 'expanded' : 'collapsed'}
      className={`
        relative bg-white rounded-xl border-2 transition-all duration-300
        ${isSelected
          ? 'border-accent shadow-lg shadow-accent/20 ring-2 ring-accent/30'
          : 'border-slate-200 hover:border-slate-300'
        }
        ${gestureMode ? 'cursor-default' : 'cursor-pointer'}
      `}
      onClick={() => !gestureMode && onToggleExpand?.()}
    >
      {/* Selection glow effect */}
      {isSelected && gestureMode && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-accent/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`
            p-3 rounded-lg transition-colors duration-300
            ${isSelected ? 'bg-accent/20' : 'bg-slate-100'}
          `}>
            <Icon className={`w-6 h-6 ${isSelected ? 'text-accent' : 'text-slate-600'}`} />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-primary">{section.title}</h3>
            <p className="text-slate-600 mt-1">{section.preview}</p>
          </div>

          {/* Expand/collapse indicator */}
          <button
            className={`
              p-2 rounded-full transition-colors
              ${isExpanded ? 'bg-accent/10 text-accent' : 'bg-slate-100 text-slate-500'}
            `}
            onClick={(e) => {
              e.stopPropagation()
              onToggleExpand?.()
            }}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-slate-700 leading-relaxed">{section.content}</p>

                {/* Media (if present) */}
                {section.media && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4"
                  >
                    <div className="bg-slate-100 rounded-lg p-4 text-center">
                      <div className="text-6xl mb-2">🏃‍♂️</div>
                      <p className="text-sm text-slate-500">{section.media.alt}</p>
                    </div>
                  </motion.div>
                )}

                {/* Tech demos (if present) */}
                {section.demos && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 grid sm:grid-cols-2 gap-3"
                  >
                    {section.demos.map((demo, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <div className="font-medium text-primary text-sm">{demo.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{demo.description}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gesture hint when selected */}
      {isSelected && gestureMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-xs text-accent font-medium">
            {isExpanded ? '🤏 Pinch per contrarre' : '🤏 Pinch per espandere'}
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default GestureCard
